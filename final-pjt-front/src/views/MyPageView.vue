<template>
  <!-- 마이페이지 -->
  <div>
    <h1 class="mt-10">{{ profile.username }}'s Profile</h1>
    <hr class="mb-10">

    <!-- 팔로잉 / 팔로워 -->
    <div class="row mb-10">
      <h5 class="offset-4 col-2">팔로잉 {{ followingCount }} 명</h5>
      <h5 class="col-2">팔로워 {{ follwerCount }} 명</h5>
    </div>

    <!-- 유저가 좋아요 등록한 영화 -->
    <div v-if="profile.like_movies !== undefined">
      <h2 class="mb-10">내가 좋아하는 영화</h2>
      <div class="row row-cols-4 row-cols-md-12 g-4 mt-3 mb-5">
        <div class="row justify-content-center">

          <!-- glide로 표현 -->
          <vue-glide v-if="profile.like_movies.length"
            data-glide-el="track"
            ref="slider"
            type="slider"
            :bound="true"
            :per-view="10"
            :dragThreshold="100"
            :gap="10"
            :breakpoints="{
              2800: {perView: 8},
              2400: {perView: 7},
              2000: {perView: 6},
              1800: {perView: 5},
              1400: {perView: 4},
              1200: {perView: 3},
              800: {perView: 2},
              400: {perView: 1}
              }"
          >
            <!-- glide 내부의 영화 카드 -->
            <vue-glide-slide v-for="(movie, idx) in profile.like_movies" :key="idx">
              <movie-card :movie="movie"></movie-card>
            </vue-glide-slide>

          </vue-glide>
        </div>
      </div>
    </div>

    <!-- 맞팔로우한 친구가 좋아하는 영화 -->
    <div v-if="followMovies !== undefined">
      <h2 class="my-10">친구가 좋아하는 영화</h2>
      <div class="row row-cols-4 row-cols-md-12 g-4 mt-3 mb-5">
        <div class="row justify-content-center">

          <!-- glide로 표현 -->
          <vue-glide v-if="followMovies.length"
            data-glide-el="track"
            ref="slider"
            type="slider"
            :bound="true"
            :per-view="10"
            :dragThreshold="100"
            :gap="10"
            :breakpoints="{
              2800: {perView: 8},
              2400: {perView: 7},
              2000: {perView: 6},
              1800: {perView: 5},
              1400: {perView: 4},
              1200: {perView: 3},
              800: {perView: 2},
              400: {perView: 1}
              }"
          >
            <!-- glide에 들어가는 영화 카드 -->
            <vue-glide-slide v-for="(movie, idx) in followMovies" :key="idx">
              <movie-card :movie="movie"></movie-card>
            </vue-glide-slide>

          </vue-glide>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
import { mapGetters, mapActions } from 'vuex'
import { Glide, GlideSlide } from 'vue-glide-js' 


export default {
  name: 'mypageView',
  components: {
    MovieCard,
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
  },
  computed: {
    ...mapGetters(['profile', 'followMovies']),
    // 팔로잉 수
    followingCount() {
      return this.profile.followings_count
    },
    // 팔로워 수
    follwerCount() {
      return this.profile.followers_count
    }
  },
  methods: {
    ...mapActions(['fetchProfile', 'followUserMovies']),
  },
  created() {
    const payload = { username: this.$route.params.username }
    this.fetchProfile(payload)
    this.followUserMovies()
  },
}
</script>

<style>

</style>