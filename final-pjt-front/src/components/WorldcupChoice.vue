<template>
  <!-- 월드컵 영화 표시 -->
  <div v-if="!!movie">

    <!-- 영화 제목 -->
    <h2>{{ movie.title }}</h2>

    <!-- 영화 평점 -->
    <span v-for="(i, idx) in parseInt(movie.vote_average / 2)" :key="idx">
      <i style="color:yellow;" class="fas fa-star"></i>
    </span>
    <span v-if="parseInt(movie.vote_average) % 2 === 1">
      <i style="color:yellow;" class="fas fa-star-half"></i>
    </span>

    <!-- 클릭하면 이벤트 실행 -->
    <v-hover
      v-slot:default="{ hover }"
      :disabled="disabled"
      :value="value"
      max-height="600px"
    >
      <!-- 영화 포스터 -->
      <v-img
        @click="select"
        :src="imgUrl"
        class="mx-auto rounded"
        width="300px"
        height="450px"
        :elevation="hover ? 12 : 2"
      ></v-img>
    </v-hover>
  
  </div>
</template>

<script>
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
    // 영화가 선택되면 WorldcupView로 emit
    select() {
      this.$emit('choiceEvent', true)
    }
  },
  computed: {
    // 포스터 url
    imgUrl: function () {
      return "https://image.tmdb.org/t/p/original" + this.movie.poster_path
    }
  }
}
</script>

<style>

</style>