<template>
  <div>
    <div>
      <carousel-3d :width="598" :height="898" :display="11" :space="500">
        <slide v-for="(movie, idx) in movies" :index="idx" :key="idx" class="border-0">
          <carousel-form :movie="movie"></carousel-form>
        </slide>
      </carousel-3d>
    </div>

    <user-search></user-search>

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
import UserSearch from '@/components/UserSearch.vue'
import CarouselForm from '@/components/CarouselForm.vue'
import { mapActions, mapGetters } from 'vuex'
import { Carousel3d, Slide } from 'vue-carousel-3d'

export default {
  name: 'homeView',
  components: {
    MovieCard,
    UserSearch,
    Carousel3d,
    Slide,
    CarouselForm,
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
