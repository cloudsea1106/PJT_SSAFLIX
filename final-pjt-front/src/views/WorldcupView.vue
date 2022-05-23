<template>
  <div>
    <h2>Worldcup</h2>
    <div class="row row-cols-4 row-cols-md-12 g-4 mt-3 mb-5">
      <movie-card
        v-for="movie in worldMovies"
        :key="movie.id"
        :movie="movie"
      ></movie-card>
    </div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'worldcupView',
  components: {
    MovieCard,
  },
  computed: {
    ...mapGetters(['movies', 'worldMovies']),
  },
  methods: {
    ...mapActions(['fetchMovies', 'fetchWorldcupMovies'])
  },
  created() {
    this.fetchMovies()
    this.fetchWorldcupMovies()
  },

}
</script>

<style>

</style>