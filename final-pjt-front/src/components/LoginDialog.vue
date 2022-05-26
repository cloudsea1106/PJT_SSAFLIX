<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          class="mx-5"
        >
          Login
        </v-btn>
      </template>
      <v-card class="bg-black text-white" style="height:300px">
        <v-card-title class="justify-content-center">
          <span class="text-h5 fw-bold py-0 mt-1 mb-1">Login</span>
        </v-card-title>
        <div class="d-flex justify-content-center align-items-center mt-3" style="height:200px">
          <form @submit.prevent="login(credentials)">
            <div class="mx-3">
              <label for="username">ID: </label>
              <input v-model="credentials.username" type="text" id="username" placeholder="ID를 입력하세요." class="text-white ms-1" required />
            </div>

            <div class="mx-3 my-3">
              <label for="password">Password: </label>
              <input v-model="credentials.password" type="password" id="password" placeholder="비밀번호를 입력하세요." class="text-white ms-1" required />
            </div>
            
            <div class="d-flex justify-content-end mt-5">
              <button class="btn btn-primary mx-1" @click="dialog = false">Login</button>
              <button
                class="btn btn-secondary"
                @click="cancelLogin"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginView',
  data() {
    return {
      dialog: false,
      credentials: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    cancelLogin: function () {
      this.credentials.username = ''
      this.credentials.password = ''
      this.dialog = false
    }
  },
}
</script>