<template>
  <div class="container">
    <div class="row">
      <!-- 포스터 -->
      <div class="col-6">
        <img :src="imgUrl" alt="" class="" id="poster">
      </div>
      <div class="row col-6 align-items-center text-start">
        <!-- 제목 -->
        <h1 class="mb-0">{{ movie.title }}</h1>

        <div>
          <span>평점: </span>
          <span>{{ movie.vote_average }}</span>
        </div>

        <div>
          <span>장르: </span>
          <span>{{ movieGenre }}</span>
        </div>
        
        <div>
          <span>줄거리: </span>
          <span>{{ movie.overview }}</span>
        </div>

        <div v-if="isLoggedIn">
          <div>
            Likeit:
            <button
              @click="likeMovie(movieId)"
            >{{ likeCount }}</button>
          </div>
        </div>
        <span>
          <a :href="previewUrl" target="_blank">
            <v-btn depressed color="primary">Preview</v-btn>
          </a>
        </span>
      </div>

      <div class="col mb-5">
        <review-list :reviews="movieReviews"></review-list>
      </div>
    </div>

    <span>뒤로가기 </span>
    <button @click="goBack" type="button" class="btn btn-secondary">BACK</button>
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
    ...mapGetters(['movie', 'isLoggedIn', 'movieReviews']),
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
#poster {
  height: 500px;
}
</style>