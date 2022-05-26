<template>
  <button @click="getLogout" class="text-primary">
    Logout
  </button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'


export default {
  methods: {
    ...mapActions(['logout']),
    getLogout: function () {
      if (this.isLoggedIn) {
        this.logout()
      } else {
        alert('잘못된 접근')
        this.$router.back()
      }
    },
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
}
</script>

<style></style>
