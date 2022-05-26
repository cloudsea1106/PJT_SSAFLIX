<template>
  <form @submit="onSubmit" class="review-list-form row">

    <div class="col-2">
      <div class="form-group mx-0">
        <select id="rate" v-model="movieRate" class="form-control bg-warning border-0 text-center py-0">
          <option
            :value="rate"
            v-for="(rate, idx) in [1, 2, 3, 4, 5]"
            :key="idx"
            class="bg-black text-warning"
          >{{ rate }}
          </option>
        </select>
      </div>
    </div>
    
    <div id="review" class="col-1">
      <label for="review">Review: </label>

    </div>
    <div id="review" class="col-6">
      <textarea class="form-control text-white bg-black rounded" rows="1" id="review" v-model="content">
      </textarea>
    </div>

    <div class="col-3">
      <button class="btn btn-primary">Submit</button>
    </div>
    <hr id="reviewHr">

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
#review {
  font-size: 1.2rem;
}

#reviewHr {
  background-color: #a9b93b;
  height: 5px;
  border: 0px;
}
</style>