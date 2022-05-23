<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        class="px-0 mx-1"
        min-width="150"
        max-width="250"
        height="100%"
      >
        <v-img
          :src="imgUrl"
          
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
                DETAIL <br>
                {{ movie.vote_average }}
              </button>
            </router-link>
          </v-overlay>
        </v-fade-transition>
      </v-card>
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