<template>
  <div class="review-list">
    <ul>
      <review-list-item 
        v-for="review in reviews" 
        :review="review" 
        :key="review.id">
      </review-list-item>        
    </ul>

    <review-list-form></review-list-form>
  </div>
</template>

<script>
import ReviewListItem from '@/components/ReviewListItem.vue'
import ReviewListForm from '@/components/ReviewListForm.vue'
// import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'ReviewList',
  components: {
    ReviewListForm, 
    ReviewListItem
  },
  props: {
    reviews: Array
  },
}
</script>

<style>
.review-list {
  border: 1px solid blue;
}
</style>