<template>
  <div>
    <h1>{{ profile.username }}</h1>

    <h5>팔로잉: {{ followingCount }} 명</h5>
    <h5>팔로워: {{ follwerCount }} 명</h5>


    <h2>좋아요 한 영화</h2>
    <div class="row row-cols-4 row-cols-md-12 g-4 mt-3 mb-5">
      <movie-card
        v-for="movie in profile.like_movies"
        :key="movie.id"
        :movie="movie"
      ></movie-card>
    </div>

    <h2>친구가 좋아하는 영화</h2>
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
import MovieCard from '@/components/MovieCard.vue'
import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'mypageView',
  components: {
    MovieCard,
  },
  computed: {
    ...mapGetters(['profile','currentUser', 'followMovies']),
    followingCount() {
      return this.profile.followings_count
    },
    follwerCount() {
      return this.profile.followers_count
    }
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