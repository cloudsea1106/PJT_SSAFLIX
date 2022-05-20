from rest_framework import serializers
from ..models import Genre, Movie


class GenreSerializer(serializers.ModelSerializer):

    class MovieSerializer(serializers.ModelSerializer):
        class Meta:
            model = Movie
            fields = ('pk', 'title',)
            
    movies = MovieSerializer(many=True)

    class Meta:
        model = Genre
        fields = '__all__'