<template>
  <li class="review-list-item">
    <div class="row">

      <div class="col-3 text-right">
        <span v-if="!isEditing">
          <span v-for="(i, idx) in parseInt(payload.vote)" :key="idx">
            <i style="color:yellow;" class="fas fa-star fa-xl"></i>
          </span>
        </span>
      </div>

      <div id="review" class="col-6 text-left" v-if="!isEditing">
        <router-link 
        :to="{ name: 'profileView', params: { username: review.user.username } }"
        class="text-decoration-none font-weight-bold text-primary"
        >
          {{ review.user.username }}
        </router-link>: 
        
        <span>{{ payload.content }}</span>
      </div>
      
      <div class="col-3">
        <span v-if="currentUser.username === review.user.username && !isEditing">
          <button
            @click="switchIsEditing"
            class="btn btn-info mr-3"
          >Edit</button>
          <button
            @click="[deleteReview(payload), updatePage()]"
            class="btn btn-danger"
          >Delete</button>
        </span>
      </div>


      <span v-if="isEditing" class="row">
        <div class="offset-1 col-2 text-right">
          <div class="form-group mx-0">
            <select id="rate" v-model="payload.vote" class="form-control bg-warning border-0 text-center py-0">
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

        <div id="review" class="col-6 text-left">
          <router-link 
          :to="{ name: 'profileView', params: { username: review.user.username } }"
          class="text-decoration-none font-weight-bold text-primary"
          >
          {{ review.user.username }}
          </router-link>: 

          <input type="text" v-model="payload.content" class="text-white mx-3">

        </div>

        <div class="col-3">
          <button
            @click="onUpdate"
            class="btn btn-info mr-3"
            >Update</button>
          <button
            @click="switchIsEditing"
            class="btn btn-secondary"
            >Cancel</button>

        </div>
      </span>

      <hr>
    </div>
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
#review {
  font-size: 1.2rem;
}
</style>