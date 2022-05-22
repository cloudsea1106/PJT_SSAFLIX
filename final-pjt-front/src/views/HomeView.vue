<template>
  <div>
    <h2>NEW</h2>
    <div class="row row-cols-4 row-cols-md-12 g-4 mt-3 mb-5">
      <movie-card
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      ></movie-card>
    </div>
    <h2>Recommand</h2>
    <div class="row row-cols-4 row-cols-md-12 g-4 mt-3 mb-5">
      <movie-card
        v-for="movie in movies"
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
  name: 'homeView',
  components: {
    MovieCard,
  },
  computed: {
    ...mapGetters(['movies'])
  },
  methods: {
    ...mapActions(['fetchMovies'])
  },
  created() {
    this.fetchMovies()
  }
}
</script>
