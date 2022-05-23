<template>
  <form @submit="onSubmit" class="review-list-form">
    <label for="review">review: </label>
    <input type="text" id="review" v-model="content" required/>

    <br>
    <select name="rate" id="rate" v-model="movieRate">
      <option
        :value="rate"
        v-for="(rate, idx) in [0, 1, 2, 3, 4, 5]"
        :key="idx"
      >{{ rate }}
      </option>
    </select>
    <br>

    <button>Submit</button>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ReviewListForm',
  data() {
    return {
      content: '',
      movieRate: 0
    }
  },
  computed: {
    ...mapGetters(['movie']),
  },
  methods: {
    ...mapActions(['createReview']),
    onSubmit() {
      this.createReview({ movieId: this.movie.id, content: this.content, vote: this.movieRate})
      this.content = ''
    }
  }
}
</script>

<style>
.review-list-form {
  border: 1px solid black;
  margin: 1rem;
  padding: 1rem;
}
</style>