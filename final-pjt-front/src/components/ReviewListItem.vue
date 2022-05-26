<template>
  <li class="review-list-item">
    <router-link 
    :to="{ name: 'profileView', params: { username: review.user.username } }"
    class="text-decoration-none">
      {{ review.user.username }}
    </router-link>: 
    
    <span v-if="!isEditing">{{ payload.content }}</span><br>
    <span v-if="!isEditing">{{ payload.vote }}</span>
    <br>

    <span v-if="isEditing">
      <input type="text" v-model="payload.content" class="text-white mx-3">
      <select name="rate" id="rate" v-model="payload.vote" class="text-white me-3">
      <option
        :value="rate"
        v-for="(rate, idx) in [0, 1, 2, 3, 4, 5]"
        :key="idx"
        class="bg-black"
      >{{ rate }}
      </option>
    </select>
      <button @click="onUpdate">Update</button> |
      <button @click="switchIsEditing">Cancel</button>
    </span>

    <span v-if="currentUser.username === review.user.username && !isEditing">
      <button @click="switchIsEditing">Edit</button> |
      <button @click="[deleteReview(payload), updatePage()]">Delete</button>
    </span>
    <hr>
  </li>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ReviewListItem',
  props: {
    review: Object
  },
  data() {
    return {
      isEditing: false,
      payload: {
        movieId: this.review.movie,
        reviewId: this.review.id,
        content: this.review.content,
        vote: this.review.vote
      },
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  methods: {
    ...mapActions(['updateReview', 'deleteReview']),
    switchIsEditing() {
      this.isEditing = !this.isEditing
    },
    onUpdate() {
      this.updateReview(this.payload)
      this.isEditing = false
    },
    updatePage() {
      this.$router.go(0)
    }
  },

}
</script>

<style>
</style>