<template>
  <v-container class="worldcup">
    <h2>Worldcup</h2>

    <div v-if="!finishFlag">
      <h1>선택해 주세요</h1>
      <hr>
      <div v-if="!left">
        <v-btn v-if="finalRound" @click="goNext">결승전</v-btn>
        <v-btn v-else @click="goNext">{{ roundNum }}강 시작하기</v-btn>
      </div>
      <v-row
        align="center"
        justify="center"
      >
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
    
    <div v-if="finishFlag">
      <h1>우승!</h1>
      <hr>
      <v-row
        align="center"
        justify="center"
      >
        <v-col cols="6">
          <worldcup-choice
            id="winner"
            :movie="left"
          ></worldcup-choice>
        </v-col>

      </v-row>
    </div>
    <div>
      <router-link to="/">
        <button 
          class="btn btn-secondary" 
        >
          BACK
        </button>
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
    choiceLeft() {
      this.nextRound.push(this.left)
      this.left = null
      this.right = null
      this.goNext()
    },
    choiceRight() {
      this.nextRound.push(this.right)
      this.left = null
      this.right = null
      this.goNext()
    },
    goNext() {
      if (!this.finishFlag && this.currentRound.length === 0) {
        this.currentRound = this.worldMovies
      }
      this.left = this.currentRound.pop(0)
      this.right = this.currentRound.pop(0)
    }
  },
  watch: {
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