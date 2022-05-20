<template>
  <div>
    <h2>NEW</h2>
    <div class="row row-cols-4 row-cols-md-12 g-4 mt-3 mb-5">
      <movie-card
        v-for="movie in movies1"
        :key="movie.id"
        :movie="movie"
      ></movie-card>
    </div>
    <h2>Recommand</h2>
    <div class="row row-cols-4 row-cols-md-12 g-4 mt-3 mb-5">
      <movie-card
        v-for="movie in movies2"
        :key="movie.id"
        :movie="movie"
      ></movie-card>
    </div>
  </div>

</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
import axios from 'axios'


export default {
  components: {
    MovieCard,
  },
  data: function () {
    return {
      movies1: [],
      movies2: [],
    }
  },
  methods: {
    moviesList: function () {
      
      const API_KEY = '2a6dea0a3c73563a3895522bdb8c6a92'
      const API_URL = 'https://api.themoviedb.org/3/movie/popular'
      
      const params = {
        api_key: API_KEY,
        region: 'KR',
        language: 'ko',
      }

      axios({
        method: 'get',
        url: API_URL,
        params: params,
      })
        .then(res => {
          this.movies1 = res.data.results.slice(0,6)
          this.movies2 = res.data.results.slice(6,12)
        })
    }
  },
  beforeMount() {
    this.moviesList()
  }
  
}
</script>
