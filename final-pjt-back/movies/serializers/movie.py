from rest_framework import serializers
from ..models import Movie, Genre
from .review import ReviewSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class MovieSerializer(serializers.ModelSerializer):

    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('pk', 'username',)

    class GenreSerializer(serializers.ModelSerializer):
        class Meta:
            model = Genre
            fields = ('pk', 'name',)

    genres = GenreSerializer(many=True)
    review_set = ReviewSerializer(many=True, read_only=True)
    like_users = UserSerializer(many=True, read_only=True)
    review_count = serializers.IntegerField(source='review_set.count', read_only=True)
    like_count = serializers.IntegerField(source='like_users.count', read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'
