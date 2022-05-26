<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <div class="border-0">
        <v-img
          :src="imgUrl"
          width="600"
          height="900"
        ></v-img>

        <v-fade-transition>
          <v-overlay
            v-if="hover"
            absolute
            color="#032358"
          >
            <router-link
              :to="{ name: 'movie', params: {movieId: movie.id} }"
            >
              <button class="btn btn-primary">
                {{ movie.title }} <br>
              </button>
              <br>
              <div class="d-flex justify-content-center">
                <span v-for="(i, idx) in parseInt(movie.vote_average / 2)" :key="idx">
                  <i style="color:yellow;" class="fas fa-star"></i>
                </span>
                <span v-if="parseInt(movie.vote_average) % 2 === 1">
                  <i style="color:yellow;" class="fas fa-star-half"></i>
                </span>
              </div>
            </router-link>
          </v-overlay>
        </v-fade-transition>
      </div>
    </template>
  </v-hover>
</template>

<script>

export default {
  props: {
    movie: Object,
  },
  computed: {
    imgUrl: function () {
      return "https://image.tmdb.org/t/p/original" + this.movie.poster_path
    }
  }
}
</script>

<style>

</style>