<template>
  <div class="row">

    <!-- 유저 검색 form -->
    <form @submit.prevent="moveToProfile">
      <label for="username" class="col-2 text-right">Search User : </label>

      <input
        v-model="targetUser"
        type="text"
        id="username"
        class="mx-3 text-white border border-white col-5 rounded"
        placeholder="친구를 찾아보세요!"
        required
      >

      <!-- 검색 버튼 -->
      <button class="btn btn-primary col-1">SEARCH</button>

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
    // 유저 프로필로 이동
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
label {
  font-size: 1.5rem;
}
</style>