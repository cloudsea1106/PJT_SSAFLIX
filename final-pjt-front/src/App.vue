<template>
  <v-app id="app">
    <nav class="navbar navbar-expand-lg bg-light sticky-top bg-black">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img alt="Vue logo" src="./assets/logo.png" height="30">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <!-- 홈 -->
            <li class="nav-item">
              <router-link class="nav-link text-primary" to="/">Home</router-link>
            </li>
            <!-- 마이페이지 -->
            <li class="nav-item" v-if="isLoggedIn">
              <router-link 
                class="nav-link text-primary"
                :to="{ name: 'mypageView', params: { username } }">My Page</router-link>
            </li>
            <!-- 로그인 -->
            <li class="nav-item" v-if="!isLoggedIn">
              <login-dialog class="nav-link"></login-dialog>
            </li>
            <!-- 회원가입 -->
            <li class="nav-item" v-if="!isLoggedIn">
              <signup-dialog class="nav-link"></signup-dialog>
            </li>
            <!-- 로그아웃 -->
            <li class="nav-item" v-if="isLoggedIn">
              <logout-view class="nav-link"></logout-view>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view/>
  </v-app>
</template>

<script>
import LoginDialog from '@/components/LoginDialog.vue'
import SignupDialog from '@/components/SignupDialog.vue'
import LogoutView from '@/components/LogoutView.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    LoginDialog,
    SignupDialog,
    LogoutView,
  },
  methods: {
    ...mapActions(['fetchCurrentUser'])
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'currentUser']),
    username() {
      return this.currentUser.username ? this.currentUser.username : 'guest'
    },
  },
  created() {
    this.fetchCurrentUser()
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  background-color: black;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
      font-weight: bold;
    }
  }
}
</style>
