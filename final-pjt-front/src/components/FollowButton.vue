<template>
  <div>
    <!-- 프로필 유저와 로그인 유저가 다른경우만 보여준다 -->
    <div v-if="profile.pk != currentUser.pk" class="row">
      
      <!-- 팔로우하고있는 경우 UNFOLLOW를 보여준다 -->
      <button
        v-if="!!this.profile.followers && profile.followers.map(user => user.pk).includes(currentUser.pk)"
        @click="followUser(profile.pk)"
        class="btn btn-secondary offset-5 col-2"
      >UNFOLLOW</button>

      <button v-else
        @click="followUser(profile.pk)"
        class="btn btn-primary offset-5 col-2"
      >FOLLOW</button>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'followButton',
  computed: {
    ...mapGetters(['profile','currentUser']),
  },
  methods: {
    ...mapActions(['fetchProfile', 'followUser']),
  },
  created() {
    const payload = { username: this.$route.params.username }
    this.fetchProfile(payload)
  },
}
</script>

<style>

</style>