<template>
  <div>
    <h1>{{ profile.username }}'s Profile</h1>

    <h5>팔로잉: {{ followingCount }} 명</h5>
    <h5>팔로워: {{ follwerCount }} 명</h5>


    <follow-button/>

    <h2>{{ profile.username }}이 좋아요 한 영화</h2>
    <div class="row row-cols-4 row-cols-md-12 g-4 mt-3 mb-5">
      <movie-card
        v-for="movie in profile.like_movies"
        :key="movie.id"
        :movie="movie"
      ></movie-card>
    </div>

    <h2>{{ profile.username }}의 친구가 좋아하는 영화</h2>
    <div class="row row-cols-4 row-cols-md-12 g-4 mt-3 mb-5">
      <movie-card
        v-for="movie in followMovies"
        :key="movie.id"
        :movie="movie"
      ></movie-card>
    </div>
  </div>
</template>

<script>
import FollowButton from '@/components/FollowButton.vue'
import MovieCard from '@/components/MovieCard.vue'
import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'profileView',
  components: {
    FollowButton,
    MovieCard,
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
    this.fetchProfile(payload)
    this.followUserMovies()
  },
}
</script>

<style>

</style>