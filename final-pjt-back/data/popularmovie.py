import requests
import json

movies = []
for page in range(1, 51):
    url = f'https://api.themoviedb.org/3/movie/popular?api_key=e77799b3a9dc34288e190da6c3fcd54c&language=ko&page={page}&region=KR'
    res = requests.get(url).json()
    data = res['results']

    for movie in data:
        if movie.get('poster_path'):
            movie = {
                'model': 'movies.movie',
                'pk': movie.get('id'),
                'fields': {
                    'genres': movie.get('genre_ids'),
                    'title': movie.get('title'),
                    'overview': movie.get('overview'),
                    'poster_path': movie.get('poster_path'),
                    'release_date': movie.get('release_date'),
                    'vote_count': movie.get('vote_count'),
                    'vote_average': movie.get('vote_average'),
                },
            }

        movies.append(movie)

with open('popularmoviedata.json', 'w') as f:
    json.dump(movies, f)