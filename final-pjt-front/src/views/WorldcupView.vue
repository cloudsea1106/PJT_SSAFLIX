<template>
  <!-- 월드컵 페이지 -->
  <v-container class="worldcup">
    <h2>WORLDCUP
      <i style="color:yellow;" class="fa-solid fa-trophy"></i>
    </h2>

    <!-- 종료 전 -->
    <div v-if="!finishFlag">
      <hr class="mb-10">

      <!-- 매 반목이 끝나면 -->
      <div v-if="!left">

        <!-- 결승전 -->
        <button
          v-if="finalRound"
          @click="goNext"
          class="btn btn-warning col-10 display-4 p-5 text-white my-15"
        >결승전</button>

        <!-- 결승전이 아닌 경우 -->
        <button
          v-else
          @click="goNext"
          class="btn btn-success col-10 display-4 p-5 text-white my-15"  
        >{{ roundNum }}강 시작하기
        </button>
      </div>

      <!-- 영화 정보 (좌, 우) 표현 -->
      <v-row align="center" justify="center">

        <v-col cols="6" aling="center">
          <worldcup-choice
            id="left"
            :movie="left"
            @choiceEvent="choiceLeft"
          ></worldcup-choice> 
        </v-col>

        <v-col cols="6" aling="center">
          <worldcup-choice
            id="right"
            :movie="right"
            @choiceEvent="choiceRight"
          ></worldcup-choice> 
        </v-col>

      </v-row>
    </div>
    
    <!-- 종료 후 -->
    <div v-if="finishFlag">
      <h1>
        <i style="color:yellow;" class="fa-solid fa-trophy"></i>
        우승!
        <i style="color:yellow;" class="fa-solid fa-trophy"></i>
      </h1>
      <hr>

      <!-- 우승한 영화 -->
      <v-row align="center" justify="center">
        <v-col cols="6">
          <worldcup-choice id="winner" :movie="left"></worldcup-choice>
        </v-col>

        <!--  DETAIL 페이지 -->
        <router-link :to="{ name: 'movie', params: {movieId: left.id} }">
          <button class="btn btn-primary">
            DETAIL <br>
          </button>
        </router-link>

      </v-row>
    </div>

    <!-- 홈 버튼 -->
    <div>
      <router-link to="/">
        <button class="btn btn-secondary mt-10">HOME</button>
      </router-link>
    </div>

  </v-container>
  
</template>

<script>
import WorldcupChoice from '@/components/WorldcupChoice.vue'
import { mapActions, mapGetters } from 'vuex'


export default {
  name: 'worldcupView',
  data() {
    return {
      currentRound: [],
      nextRound: [],
      roundNum: 16,
      left: null,
      right: null,
      finishFlag: false,
      finalRound: false,
    }
  },
  components: {
    WorldcupChoice,
  },
  computed: {
    ...mapGetters(['worldMovies']),
  },
  methods: {
    ...mapActions(['fetchMovies', 'fetchWorldcupMovies']),
    // 왼쪽 선택
    choiceLeft() {
      this.nextRound.push(this.left)
      this.left = null
      this.right = null
      this.goNext()
    },
    // 오른쪽 선택
    choiceRight() {
      this.nextRound.push(this.right)
      this.left = null
      this.right = null
      this.goNext()
    },
    // 다음 경기로 이동
    goNext() {
      if (!this.finishFlag && this.currentRound.length === 0) {
        this.currentRound = this.worldMovies
      }
      this.left = this.currentRound.pop(0)
      this.right = this.currentRound.pop(0)
    }
  },
  watch: {
    // 반복이 끝나는 경우
    left: function() {
      if (this.currentRound.length === 0 && !this.left) {
        this.currentRound = this.nextRound
        this.nextRound = []
        this.roundNum /= 2
        if (this.roundNum === 2) {
          this.finalRound = true
        }
      }
    },
    // 결승전인 경우
    right: function() {
      if (this.nextRound.length === 0 && this.currentRound.length === 1 && !this.left && !this.right) {
        this.left = this.currentRound.pop()
        this.finishFlag = true
      }
    }
  },
  created() {
    this.fetchMovies()
    this.fetchWorldcupMovies()
  },
}
</script>

<style>

</style>