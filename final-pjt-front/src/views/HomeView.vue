<template>
  <div class="container-fluid mx-0">
    <div class="row justify-content-center">
      <carousel-3d :width="598" :height="898" :display="11" :space="500">
        <slide v-for="(movie, idx) in movies" :index="idx" :key="idx" class="border-0">
          <carousel-form :movie="movie"></carousel-form>
        </slide>
      </carousel-3d>
    </div>

    <user-search v-if="isLoggedIn" class="my-10"></user-search>

    <div v-if="isLoggedIn && !!recomMovies.length">
      <h2 class="row justify-content-center mt-5 mb-10">당신에게 추천하는 영화</h2>
      <div class="row justify-content-center mb-10">
        <vue-glide v-if="!!recomMovies.length"
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

    <div class="mb-5 row">
      <router-link to="/worldcup">
        <button class="btn btn-primary col-10 display-4 p-5">
          WORLDCUP
          <i style="color:yellow;" class="fa-solid fa-trophy"></i>
        </button>
      </router-link>
    </div>
    <div>
      <i style="color:yellow;" class="fa-solid fa-rectangle"></i>
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
    if (this.isLoggedIn) {
      this.fetchRecomMovies()
    }
  },
}
</script>

