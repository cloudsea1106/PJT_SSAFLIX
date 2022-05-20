import requests
import json

url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=e77799b3a9dc34288e190da6c3fcd54c&language=ko'
res = requests.get(url).json()
data = res['genres']

genres = []

for genre in data:
    genre = {
        'model': 'movies.genre',
        'pk': genre.get('id'),
        'fields': {
            'name': genre.get('name'),
        },
    }

    genres.append(genre)


with open('genredata.json', 'w') as f:
    json.dump(genres, f)