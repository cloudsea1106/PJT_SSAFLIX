<template>
  <div>
    <!-- 포스터 -->
    <div>
      <img :src="imgUrl" alt="" height="500">
    </div>
    <!-- 제목 -->
    <h1>{{ movie.title }}</h1>

    <p>줄거리</p>
    <p>{{ movie.overview }}</p>

    <p>평점</p>
    <p>{{ movie.vote_average }}</p>

    <p>장르</p>
    <p>{{ movie.genres }}</p>

    <p>좋아요</p>
    <div>
      Likeit:
      <button
        @click="likeMovie(movieId)"
      >{{ likeCount }}</button>
    </div>

    <p>예고편</p>
    <div>
      <a :href="previewUrl" target="_blank">
        <v-btn depressed color="primary">Preview</v-btn>
      </a>
    </div>

    <review-list :reviews="movie.review_set"></review-list>

    <p>홈으로</p>
    <div>
      <router-link to="/">
        <button 
          class="btn btn-secondary" 
        >
          BACK
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ReviewList from '@/components/ReviewList.vue'

export default {
  name: 'MovieDetail',
  components: {
    ReviewList,
  },
  data() {
    return {
      movieId: this.$route.params.movieId,
    }
  },
  computed: {
    ...mapGetters(['movie']),
    likeCount() {
      return this.movie.like_users?.length
    },
    imgUrl: function () {
      return "https://image.tmdb.org/t/p/original" + this.movie.poster_path
    },
    previewUrl: function () {
      return "https://www.youtube.com/results?search_query=" + this.movie.title + " 예고편"
    },
  },
  methods: {
    ...mapActions([
      'fetchMovie',
      'likeMovie',
    ]),
  },
  created() {
    this.fetchMovie(this.movieId)
  },
}
</script>

<style>

</style>