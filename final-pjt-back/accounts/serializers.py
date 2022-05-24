from rest_framework import serializers
from django.contrib.auth import get_user_model
from movies.models import Movie
from movies.serializers.review import ReviewSerializer
from .models import User

class ProfileSerializer(serializers.ModelSerializer):

    class MovieSerializer(serializers.ModelSerializer):
        
        class Meta:
            model = Movie
            fields = '__all__'

    class UserSerializer(serializers.ModelSerializer):

        class Meta:
            model = User
            fields = ('pk', 'username',)

    like_movies = MovieSerializer(many=True)
    review_set = ReviewSerializer(many=True, read_only=True)
    followings = UserSerializer(many=True)
    followers = UserSerializer(many=True)
    followings_count = serializers.IntegerField(source='followings.count', read_only=True)
    followers_count = serializers.IntegerField(source='followers.count', read_only=True)

    class Meta:
        model = get_user_model()
        fields = ('pk', 'username', 'like_movies', 'review_set', 'followings', 'followers', 'followings_count', 'followers_count',)
    
