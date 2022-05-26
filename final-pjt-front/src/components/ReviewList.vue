<template>
  <div class="review-list rounded" v-if="isLoggedIn">
    <review-list-form></review-list-form>
    <ul>
      <review-list-item 
        v-for="review in reviews" 
        :review="review" 
        :key="review.id">
      </review-list-item>        
    </ul>

  </div>
</template>

<script>
import ReviewListItem from '@/components/ReviewListItem.vue'
import ReviewListForm from '@/components/ReviewListForm.vue'
import { mapGetters } from 'vuex'


export default {
  name: 'ReviewList',
  components: {
    ReviewListForm, 
    ReviewListItem
  },
  props: {
    reviews: Array
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
  }
}
</script>

<style>
ul {
  list-style: none;
}
</style>