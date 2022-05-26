<template>
  <div>
    <div v-if="profile.pk != currentUser.pk" class="row">
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