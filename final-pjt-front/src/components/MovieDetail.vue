<template>
  <v-row justify="center">
    <v-btn
      class="white--text"
      color="teal"
      @click="overlay = !overlay"
    >
      DETAIL
    </v-btn>

    <v-overlay
      :z-index="zIndex"
      :value="overlay"
    >
      <v-card
      >
        <div class="container">
          <div class="row">
            <v-card-title>{{ movie.title }}</v-card-title>
            <div class="col-4 px-0">
              <img :src="imgUrl" alt="" height="500">
            </div>
            <div class="col-8">
              <v-card-text>
                <p>{{ movie.overview }}</p>
                <p>{{ movie.genre_ids }}</p>
                <p>{{ movie.release_date }}</p>
                <a :href="previewUrl" target="_blank">
                  <v-btn depressed color="primary">Preview</v-btn>
                </a>
              </v-card-text>
            </div>
            <v-btn
              class="white--text"
              color="teal"
              @click="overlay = false"
            >
              CLOSE
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-overlay>
  </v-row>
</template>

<script>
export default {
  data: () => ({
      overlay: false,
      zIndex: 0,
  }),
  props: {
    movie: Object
  },
  computed: {
    imgUrl: function () {
      return "https://image.tmdb.org/t/p/original" + this.movie.poster_path
    },
    previewUrl: function () {
      return "https://www.youtube.com/results?search_query=" + this.movie.title + " 예고편"
    }
  }
}
</script>

<style>

</style>