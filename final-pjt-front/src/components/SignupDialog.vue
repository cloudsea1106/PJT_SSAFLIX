
<template>
  <div v-if="!!movie">
    <h2>{{ movie.title }}</h2>
    <v-hover
      v-slot:default="{ hover }"
      :disabled="disabled"
      :value="value"
      max-height="600px"
    >
      <v-img
        @click="select"
        :src="imgUrl"
        class="mx-auto"
        alt=""
        width="400px"
        height="600px"
        :elevation="hover ? 12 : 2"
      ></v-img>
    </v-hover>
    <p>줄거리</p>
    <p>{{ movie.overview.slice(0,200) }}...</p>

    <p>평점</p>
    <p>{{ movie.vote_average }}</p>

    <p>장르</p>
    <p>{{ movie.genres }}</p>
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