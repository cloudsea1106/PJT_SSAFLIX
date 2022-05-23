<template>
  <div>
    <div>
      <h2>NEW</h2>
      <div class="row row-cols-4 row-cols-md-12 g-4 mt-3 mb-5">
        <movie-card
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
        ></movie-card>
      </div>
    </div>

    <div v-if="isLoggedIn">
      <h2>Recommend</h2>
      <div class="row row-cols-4 row-cols-md-12 g-4 mt-3 mb-5">
        <movie-card
          v-for="movie in recomMovies"
          :key="movie.id"
          :movie="movie"
        ></movie-card>
      </div>
    </div>

    <div>
      <router-link to="/worldcup">
        <button class="btn btn-primary">
          WORLD CUP
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'homeView',
  components: {
    MovieCard,
  },
  computed: {
    ...mapGetters(['movies', 'recomMovies']),
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    ...mapActions(['fetchMovies', 'fetchRecomMovies'])
  },
  created() {
    this.fetchMovies()
    this.fetchRecomMovies()
  },
}
</script>
