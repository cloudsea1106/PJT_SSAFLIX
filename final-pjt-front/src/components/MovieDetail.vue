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
    <p>{{ movieGenre }}</p>

    <div v-if="isLoggedIn">
      <p>좋아요</p>
      <div>
        Likeit:
        <button
          @click="likeMovie(movieId)"
        >{{ likeCount }}</button>
      </div>

    </div>

    <p>예고편</p>
    <div>
      <a :href="previewUrl" target="_blank">
        <v-btn depressed color="primary">Preview</v-btn>
      </a>
    </div>

    <review-list :reviews="movie.review_set"></review-list>

    <p>뒤로가기</p>
    <button @click="goBack" type="button">BACK</button>
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
    ...mapGetters(['movie', 'isLoggedIn']),
    likeCount() {
      return this.movie.like_users?.length
    },
    imgUrl: function () {
      return "https://image.tmdb.org/t/p/original" + this.movie.poster_path
    },
    previewUrl: function () {
      return "https://www.youtube.com/results?search_query=" + this.movie.title + " 예고편"
    },
    movieGenre() {
      const genres = []
      if (this.movie.genres !== undefined) {
        this.movie.genres.forEach(obj => {
          genres.push(obj.name)
        })
      }
      return genres.join(' / ')
    }
  },
  methods: {
    ...mapActions(['fetchMovie', 'likeMovie']),
    goBack() {
      this.$router.go(-1)
    }
  },
  created() {
    this.fetchMovie(this.movieId)
  },
}
</script>

<style>

</style>