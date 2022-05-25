<template>
  <div>
    <div v-if="profile.pk != currentUser.pk">
      <v-btn v-if="!!this.profile.followers && profile.followers.map(user => user.pk).includes(currentUser.pk)"
        @click="followUser(profile.pk)"
      >UNFOLLOW</v-btn>
      <v-btn v-else
        @click="followUser(profile.pk)"
      >FOLLOW</v-btn>
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