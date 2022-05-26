from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from django.shortcuts import get_list_or_404, get_object_or_404
from .models import Movie, Review
from .serializers.movie import MovieSerializer
from .serializers.review import ReviewSerializer
from django.contrib.auth import get_user_model
import random


User = get_user_model()


# 인기 영화(누구에게나 추천)
@api_view(['GET'])
def movie_list(request):
    # 인기 영화 리스트 중 랜덤으로 12개를 추출하여 보여주는 방식
    
    movies = get_list_or_404(Movie)
    random_twelve_movies = random.sample(movies, 12)
    serializer = MovieSerializer(random_twelve_movies, many=True)
    return Response(serializer.data)


# 선호 장르(로그인유저)
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def movie_genre(request):
    # 내가 리뷰를 남긴 영화들의 장르들 중 점수3점이상(만점5점), 가장 많은 장르 1~2위를 선출
    # 리뷰를 남긴 사람 대상, 장르가 1개 뿐이라면 1개에 대해서만

    user = get_object_or_404(User, pk=request.user.pk)
    my_reviews = get_list_or_404(Review, user=user, vote__gte=3)
    serializer = ReviewSerializer(my_reviews, many=True)
    
    # 나의 리뷰 기반 선호 장르를 알아보기 위해 리뷰에 해당하는 장르 정리 
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
    best_genre = []  # 선호 장르 리스트
    
    if len(genres_list) >= 2:  # 2개 이상이면
        best_genre.append(genres_list[0][0])
        best_genre.append(genres_list[1][0])  # 상위 2개
    
    elif len(genres_list) == 1:  # 1개 뿐이면
        best_genre.append(genres_list[0][0])
    
    movies = []  # 추천 영화 리스트
    for genre in best_genre:
        # 해당장르, 6점이상 영화(총점10점)
        genre_movies = get_list_or_404(Movie, vote_average__gte=6, genres=genre)

        cnt = 0
        while True:
            if cnt == 6:
                break
            random_movie = random.choice(genre_movies)
            serializer = MovieSerializer(random_movie)
            if serializer.data not in movies:
                # 하나의 장르 내에서, 그리고 두 개의 장르 간에 중복 추천 방지 위함
                movies.append(serializer.data)
                cnt += 1

    return Response(movies)


@api_view(['GET'])
def movie_worldcup(request):
    # 랜덤으로 16개의 영화를 추출하여 더 마음에 드는 영화를 유저가 직접 선택하도록 함

    movies = get_list_or_404(Movie, vote_average__gte=6)
    random_sixteen_movies = random.sample(movies, 16)
    serializer = MovieSerializer(random_sixteen_movies, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def movie_detail(request, movie_pk):
    # pk에 해당하는 영화의 디테일 정보

    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def like_movie(request, movie_pk):
    # 영화에 대한 좋아요 기능

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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_review(request, movie_pk):
    # 리뷰 작성 기능

    user = request.user
    movie = get_object_or_404(Movie, pk=movie_pk)
    
    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(movie=movie, user=user)

        # 기존 serializer 가 return 되면, 단일 review 만 응답으로 받게됨.
        # 사용자가 댓글을 입력하는 사이에 업데이트된 review 확인 불가 => 업데이트된 전체 목록 return 
        reviews = movie.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT', 'DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def review_update_or_delete(request, movie_pk, review_pk):
    # 리뷰 업데이트, 삭제 기능

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

