<template>
  <div class="container-fluid mx-0">
    <div class="row justify-content-center">
      <carousel-3d :width="598" :height="898" :display="11" :space="500">
        <slide v-for="(movie, idx) in movies" :index="idx" :key="idx" class="border-0">
          <carousel-form :movie="movie"></carousel-form>
        </slide>
      </carousel-3d>
    </div>

    <user-search v-if="isLoggedIn" class="my-5"></user-search>

    <div v-if="isLoggedIn" class="">
      <h2 class="row justify-content-center mb-3">Recommend</h2>
      <div class="row justify-content-center mb-5">
        <vue-glide v-if="recomMovies.length"
          data-glide-el="track"
          ref="slider"
          type="slider"
          :bound="true"
          :per-view="10"
          :dragThreshold="100"
          :gap="10"
          :breakpoints="{
            2800: {perView: 8},
            2400: {perView: 7},
            2000: {perView: 6},
            1800: {perView: 5},
            1400: {perView: 4},
            1200: {perView: 3},
            800: {perView: 2},
            400: {perView: 1}
            }"
        >
          <vue-glide-slide v-for="(movie, idx) in recomMovies" :key="idx">
            <movie-card
              :movie="movie"
            ></movie-card>
          </vue-glide-slide>
        </vue-glide>
      </div>
    </div>

    <div class="mb-5">
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
import { Glide, GlideSlide } from 'vue-glide-js' 

export default {
  name: 'homeView',
  components: {
    MovieCard,
    UserSearch,
    Carousel3d,
    Slide,
    CarouselForm,
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
  },
  computed: {
    ...mapGetters(['movies', 'recomMovies', 'isLoggedIn']),
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
