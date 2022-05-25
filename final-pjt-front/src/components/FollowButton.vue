<template>
  <div>
    <div v-if="profile.pk != currentUser.pk">
      <p>{{ followCheck }}</p>
      <v-btn v-if="profile.followers.map(user => user.pk).includes(currentUser.pk)"
        @click="followUser(profile.pk)"
      >UNFOLLOW</v-btn>
      <v-btn v-else
        @click="followUser(profile.pk)"
      >FOLLOW</v-btn>
      <!-- <button
        @click="followUser(profile.pk)"
      >{{ IsFollow }}</button> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'followButton',
  data() {
    return {
      followCheck: ''
    }
  },
  computed: {
    ...mapGetters(['profile','token','currentUser']),
    IsFollow() {
      console.log(!!this.profile.followers)
      if (!!this.profile.followers && this.profile.followers.map(user => user.pk).includes(this.currentUser.pk)) {
        console.log(111111111)
        return this.followCheck = 'UNFOLLOW'
      } else {
        console.log(22222222222222)
        return this.followCheck = 'FOLLOW'
      }
    }
  },
  methods: {
    ...mapActions(['fetchProfile', 'followUser']),
  },
  created() {
    const payload = { username: this.$route.params.username }
    this.fetchProfile(payload)
    this.IsFollow
  },
}
</script>

<style>

</style>