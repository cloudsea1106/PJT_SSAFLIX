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
                {{ movie.vote_average }}
              </button>
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