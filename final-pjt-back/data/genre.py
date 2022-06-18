# 초기 데이터 생성

import requests
import json
import tmdb

url = f'https://api.themoviedb.org/3/genre/movie/list?api_key={tmdb.api_key}&language=ko'
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


with open('genredata.json', 'w', encoding='utf-8') as f:
    json.dump(genres, f, ensure_ascii=False)