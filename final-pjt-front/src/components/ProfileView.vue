<template>
  <div>
    <!-- 프로필 이름 -->
    <h1 class="mt-10">{{ profile.username }}'s Profile</h1>
    <hr class="mb-10">
    
    <!-- 팔로우 / 팔로워 -->
    <div class="row mb-5">
      <h5 class="offset-4 col-2">팔로잉 {{ followingCount }} 명</h5>
      <h5 class="col-2">팔로워 {{ follwerCount }} 명</h5>
    </div>

    <!-- 팔로우 버튼 -->
    <follow-button class="mb-10"/>

    <!-- 프로필 유저가 좋아하는 영화 -->
    <div v-if="profile.like_movies !== undefined">
      <h2 class="mb-10">{{ profile.username }}님이 좋아해요</h2>

      <!-- 영화 glide -->
      <div class="row row-cols-4 row-cols-md-12 g-4 mt-3 mb-5">
        <vue-glide
          v-if="profile.like_movies.length"
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
</template>

<script>
import FollowButton from '@/components/FollowButton.vue'
import MovieCard from '@/components/MovieCard.vue'
import { mapGetters, mapActions } from 'vuex'
import { Glide, GlideSlide } from 'vue-glide-js' 


export default {
  name: 'profileView',
  components: {
    FollowButton,
    MovieCard,
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
  },
  computed: {
    ...mapGetters(['profile']),
    // 팔로우 수
    followingCount() {
      return this.profile.followings_count
    },
    // 팔로워 수
    follwerCount() {
      return this.profile.followers_count
    },
  },
  methods: {
    ...mapActions(['fetchProfile']),
  },
  created() {
    const payload = { username: this.$route.params.username }
    this.fetchProfile(payload.username)
  },
}
</script>

<style>

</style>