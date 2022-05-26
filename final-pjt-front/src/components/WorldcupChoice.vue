<template>
  <div v-if="!!movie">
    <h2>{{ movie.title }}</h2>
    <span v-for="(i, idx) in parseInt(movie.vote_average / 2)" :key="idx">
      <i style="color:yellow;" class="fas fa-star"></i>
    </span>
    <span v-if="parseInt(movie.vote_average) % 2 === 1">
      <i style="color:yellow;" class="fas fa-star-half"></i>
    </span>
    <v-hover
      v-slot:default="{ hover }"
      :disabled="disabled"
      :value="value"
      max-height="600px"
    >
      <v-img
        @click="select"
        :src="imgUrl"
        class="mx-auto rounded"
        alt=""
        width="300px"
        height="450px"
        :elevation="hover ? 12 : 2"
      ></v-img>
    </v-hover>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      movieObject: null,
      disabled: false,
      value: false,
    }
  },
  
  props: {
    movie:{
      type: Object,
      required: false,
    }
  },
  methods: {
    select() {
      this.$emit('choiceEvent', true)
    }
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