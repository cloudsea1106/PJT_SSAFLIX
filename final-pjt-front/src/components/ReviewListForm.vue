<template>
  <form @submit="onSubmit" class="review-list-form rounded">
    <label for="review">review: </label>
    <textarea class="form-control text-white bg-black rounded" rows="3" id="review" v-model="content">
    </textarea>

    <div>
      <span>영화 평가하기: </span>
      <select name="rate" id="rate" v-model="movieRate" class="text-white">
        <option
          :value="rate"
          v-for="(rate, idx) in [0, 1, 2, 3, 4, 5]"
          :key="idx"
          class="bg-black"
        >{{ rate }}
        </option>
      </select>

    </div>

    <button class="btn btn-primary">Submit</button>
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
  border: 1px solid #0D6EFD;
  margin: 1rem;
  padding: 1rem;
}

form > input {
  border: 1px solid #0D6EFD;
}
</style>