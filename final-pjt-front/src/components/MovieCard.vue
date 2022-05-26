<template>
  <v-hover>
    <template v-slot:default="{ hover }">

      <!-- glide에서의 영화 카드 -->
      <v-card class="px-0 mx-1" width="250">

        <!-- 영화 포스터 -->
        <v-img :src="imgUrl" height='375'></v-img>

        <!-- hover -->
        <v-fade-transition>
          <v-overlay v-if="hover" absolute color="#032358">

            <!-- DETAIL 페이지 버튼 -->
            <router-link :to="{ name: 'movie', params: {movieId: movie.id} }">
              <button class="btn btn-primary">
                {{ movie.title }}
              </button>
              <br>

              <!-- 영화의 평점을 별모양을 표현 -->
              <span v-for="(i, idx) in parseInt(movie.vote_average / 2)" :key="idx">
                <i style="color:yellow;" class="fas fa-star"></i>
              </span>
              <span v-if="parseInt(movie.vote_average) % 2 === 1">
                <i style="color:yellow;" class="fas fa-star-half"></i>
              </span>

            </router-link>

          </v-overlay>
        </v-fade-transition>

      </v-card>

    </template>
  </v-hover>
</template>

<script>
export default {
  props: {
    movie: Object,
  },
  computed: {
    // 포스터 url
    imgUrl: function () {
      return "https://image.tmdb.org/t/p/original" + this.movie.poster_path
    }
  }
}
</script>

<style>

</style>