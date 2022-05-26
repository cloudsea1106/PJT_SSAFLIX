<template>
  <div>
    <form @submit.prevent="moveToProfile">
      <label for="username">Search User : </label>
      <input v-model="targetUser" type="text" id="username" class="mx-3 text-white" required>
      <button
        class="btn btn-primary"
      >SEARCH</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      targetUser: ''
    }
  },
  computed: {
    ...mapGetters([ 'authHeader' ]),
  },
  methods: {
    ...mapActions([ 'fetchProfile' ]),
    moveToProfile() {
      axios({
        url: `http://127.0.0.1:8000/api/v1/accounts/profile/${this.targetUser}`,
        method: 'get',
        headers: this.authHeader,
      })
        .then(() => {
          this.$router.push(`/profile/${this.targetUser}`)
        })
        .catch(()=> alert('존재하지 않는 사용자입니다.'))
    }
  }
}
</script>

<style>

</style>