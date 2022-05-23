<template>
  <div>
    <h1>{{ profile.username }}</h1>

    <h2>좋아요 한 영화</h2>
    <div class="row row-cols-4 row-cols-md-12 g-4 mt-3 mb-5">
      <div v-for="movie in profile.like_movies" :key="movie.pk">
        <img :src="imgUrl(movie.poster_path)" height="300">
        <router-link :to="{ name: 'movie', params: { movieId: movie.id } }">
          <button>
            Detail
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'mypageView',
  computed: {
    ...mapGetters(['profile']),
  },
  methods: {
    ...mapActions(['fetchProfile']),
    imgUrl: function (path) { 
      return "https://image.tmdb.org/t/p/original" + path
    },
  },
  created() {
    const payload = { username: this.$route.params.username }
    this.fetchProfile(payload)
  },
}
</script>

<style>

</style>