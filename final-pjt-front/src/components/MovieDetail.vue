<template>
  <div class="container">
    <div class="row">

      <!-- 왼쪽 -->
      <!-- 영화 포스터 -->
      <div class="col-md-6 col-12">
        <img :src="imgUrl" id="poster">
      </div>

      <!-- 오른쪽 -->
      <div class="row col-md-6 col-12 align-items-center text-start">
        <!-- 제목 -->
        <h1 class="mb-0">{{ movie.title }}</h1>

        <div class="row">

          <!-- 좋아요 -->
          <div v-if="isLoggedIn && !!movie.like_users" class="col-1">
            
            <!-- 좋아요를 누른 경우 -->
            <div v-if="movie.like_users.map(obj => obj.pk).includes(currentUser.pk)">
              <button @click="[likeMovie(movieId), shakeIcon1()]">
                <i id="icon1" class="fa-solid fa-heart fa-2xl"></i>
              </button>
            </div>

            <!-- 좋아요를 누르지 않은 경우 -->
            <div v-else>
              <button @click="[likeMovie(movieId), shakeIcon2()]">
                <i id="icon2" class="fa-regular fa-heart fa-2xl"></i>
              </button>
            </div>
          </div>

          <!-- 예고편 -->
          <span class="col-1">
            <a :href="previewUrl" target="_blank">
              <i style="color:red" class="fa-brands fa-youtube fa-2xl"></i>
            </a>
          </span>
        </div>

        <!-- 평점 -->
        <div>
          <div v-if="!!movie.vote_average">
            <span>평점: </span>
            <span v-for="(i, idx) in parseInt(movie.vote_average / 2)" :key="idx">
              <i style="color:yellow;" class="fas fa-star"></i>
            </span>
            <span v-if="parseInt(movie.vote_average) % 2 === 1">
              <i style="color:yellow;" class="fas fa-star-half"></i>
            </span>
          </div>
        </div>

        <!-- 장르 -->
        <div>
          <span>장르: </span>
          <span>{{ movieGenre }}</span>
        </div>
        
        <!-- 줄거리 -->
        <div>
          <span>줄거리: </span>
          <span>{{ movie.overview }}</span>
        </div>

      </div>
      
      <!-- 리뷰 -->
      <div class="col my-15">
        <review-list :reviews="movieReviews"></review-list>
      </div>
    </div>

    <!-- 뒤로가기 -->
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
    ...mapGetters(['movie', 'isLoggedIn', 'movieReviews', 'currentUser']),
    // 포스터 url
    imgUrl: function () {
      return "https://image.tmdb.org/t/p/original" + this.movie.poster_path
    },
    // 예고편 url
    previewUrl: function () {
      return "https://www.youtube.com/results?search_query=" + this.movie.title + " 예고편"
    },
    // 장르 표현
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
    // 뒤로가기
    goBack() {
      this.$router.go(-1)
    },
    // 좋아요 동작 효과
    shakeIcon1() {
      const target = document.querySelector('#icon1')
      setTimeout(target.setAttribute('class', 'fa-regular fa-heart fa-2xl'), 0)
      target.setAttribute('class', 'fa-regular fa-heart fa-2xl fa-shake')
    },
    shakeIcon2() {
      const target = document.querySelector('#icon2')
      setTimeout(target.setAttribute('class', 'fa-solid fa-heart fa-2xl'), 0)
      target.setAttribute('class', 'fa-solid fa-heart fa-2xl fa-shake')
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
i {
  color: pink;
}
</style>