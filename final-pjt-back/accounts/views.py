from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from .serializers import ProfileSerializer


User = get_user_model()


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request, username):
    user = get_object_or_404(User, username=username)
    serializer = ProfileSerializer(user)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def follow(request, user_pk):
    you = get_object_or_404(User, pk=user_pk)
    me = request.user

    if me != you:
        if you.followers.filter(pk=me.pk).exists():
        # if me in you.followers.all():
            # 언팔로우
            you.followers.remove(me)
            serializer = ProfileSerializer(you)
            return Response(serializer.data)
        else:
            # 팔로우
            you.followers.add(me)
            serializer = ProfileSerializer(you)
            return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def movie_follow(request):
    user = get_object_or_404(User, pk=request.user.pk)
    serializer = ProfileSerializer(user)
    followings = serializer.data.get('followings')  # 내가 팔로잉 하는 사람들
    # followers = serializer.data.get('followers')

    me = {
        "pk": request.user.pk,
        "username": request.user.username
    }

    follow_back = []  # 맞팔유저
    for following in followings:
        following_pk = following.get('pk')
        following_user = get_object_or_404(User, pk=following_pk)
        following_serializer = ProfileSerializer(following_user)
        following_following = following_serializer.data.get('followings')  # 내가 팔로잉 하는 사람의 팔로잉 하는 사람

        if me in following_following:
            follow_back.append(following_pk)  
            # 인자로 following을 append하면 pk와 username 키를 가진 객체 추가, 여기서는 간단히 pk만 추가했음

    # return Response(follow_back)

    fb_like_movies = []  # 맞팔이 좋아하는 영화
    for fb_user_pk in follow_back:
        fb_user = get_object_or_404(User, pk=fb_user_pk)
        serializer = ProfileSerializer(fb_user)
        like_movies = serializer.data.get('like_movies')

        fb_like_movies.extend(like_movies)

    return Response(fb_like_movies)

