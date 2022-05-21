from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_list_or_404, get_object_or_404
from .models import Movie, Review
from .serializers.movie import MovieSerializer, MovieListSerializer
from .serializers.review import ReviewSerializer

from django.contrib.auth import get_user_model
User = get_user_model()

import random


# 인기 영화(누구에게나 추천)
@api_view(['GET'])
def movie_list(request):
    movies = get_list_or_404(Movie)
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)


# 선호 장르(로그인유저)
@api_view(['GET'])
def movie_genre(request):
    user = get_object_or_404(User, pk=request.user.pk)
    my_reviews = get_list_or_404(Review, user=user)
    serializer = ReviewSerializer(my_reviews, many=True)
    
    genres_dic = dict()
    for movie in serializer.data:
        movie_pk = movie.get('movie')
        movie_info = get_object_or_404(Movie, pk=movie_pk)
        movie_serializer = MovieSerializer(movie_info)
        movie_genres = movie_serializer.data.get('genres')

        for movie_genre in movie_genres:
            if genres_dic.get(movie_genre.get('pk')) == None:
                genres_dic[movie_genre.get('pk')] = 1
            else:
                genres_dic[movie_genre.get('pk')] += 1
    
    genres_list = list(genres_dic.items())
    genres_list.sort(key=lambda x: x[1], reverse=True)
    best_genre = []
    
    if len(genres_list) >= 2:  # 2개 이상이면
        best_genre.append(genres_list[0][0])
        best_genre.append(genres_list[1][0])  # 상위 2개
    
    elif len(genres_list) == 1:  # 1개 뿐이면
        best_genre.append(genres_list[0][0])
    
    movies = []
    for genre in best_genre:
        genre_movies = get_list_or_404(Movie, vote_average__gte=3, genres=genre)
        random_five_movies = random.sample(genre_movies, 5)
        serializer = MovieSerializer(random_five_movies, many=True)
        movies.extend(serializer.data)

    return Response(movies)


@api_view(['GET'])
def movie_detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)


@api_view(['POST'])
def like_movie(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    user = request.user
    if movie.like_users.filter(pk=user.pk).exists():
        movie.like_users.remove(user)
        serializer = MovieSerializer(movie)
        return Response(serializer.data)
    else:
        movie.like_users.add(user)
        serializer = MovieSerializer(movie)
        return Response(serializer.data)


@api_view(['POST'])
def create_review(request, movie_pk):
    user = request.user
    movie = get_object_or_404(Movie, pk=movie_pk)
    
    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(movie=movie, user=user)

        # 기존 serializer 가 return 되면, 단일 comment 만 응답으로 받게됨.
        # 사용자가 댓글을 입력하는 사이에 업데이트된 comment 확인 불가 => 업데이트된 전체 목록 return 
        reviews = movie.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT', 'DELETE'])
def review_update_or_delete(request, movie_pk, review_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    review = get_object_or_404(Review, pk=review_pk)

    def update_review():
        if request.user == review.user:
            serializer = ReviewSerializer(instance=review, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                reviews = movie.review_set.all()
                serializer = ReviewSerializer(reviews, many=True)
                return Response(serializer.data)

    def delete_review():
        if request.user == review.user:
            review.delete()
            reviews = movie.review_set.all()
            serializer = ReviewSerializer(reviews, many=True)
            return Response(serializer.data)
    
    if request.method == 'PUT':
        return update_review()
    elif request.method == 'DELETE':
        return delete_review()
