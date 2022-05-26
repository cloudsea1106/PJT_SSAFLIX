<template>
  <div>
    <h1>{{ profile.username }}'s Profile</h1>

    <h5>팔로잉: {{ followingCount }} 명</h5>
    <h5>팔로워: {{ follwerCount }} 명</h5>


    <follow-button/>
    <div v-if="profile.like_movies !== undefined">
      <h2>{{ profile.username }}이 좋아요 한 영화</h2>
      <div class="row row-cols-4 row-cols-md-12 g-4 mt-3 mb-5">
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
            <vue-glide-slide v-for="(movie, idx) in profile.like_movies" :key="idx">
              <movie-card
                :movie="movie"
              ></movie-card>
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
    ...mapGetters(['profile','currentUser', 'followMovies']),
    followingCount() {
      return this.profile.followings_count
    },
    follwerCount() {
      return this.profile.followers_count
    },
  },
  methods: {
    ...mapActions(['fetchProfile', 'followUserMovies']),
    imgUrl: function (path) { 
      return "https://image.tmdb.org/t/p/original" + path
    },
  },
  created() {
    const payload = { username: this.$route.params.username }
    this.fetchProfile(payload.username)
    this.followUserMovies()
  },
}
</script>

<style>

</style>