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
      <v-card>
        <v-card-title class="justify-content-center">
          <span class="text-h5">Login</span>
        </v-card-title>
          <form @submit.prevent="login(credentials)">
            <div>
              <label for="username">username: </label>
              <input v-model="credentials.username" type="text" id="username" required />
            </div>

            <div>
              <label for="password">password: </label>
              <input v-model="credentials.password" type="password" id="password" required />
            </div>

            <button class="btn btn-primary" @click="dialog = false">Login</button>
          </form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <button
            class="btn btn-secondary"
            @click="dialog = false"
          >
            Cancel
          </button>
        </v-card-actions>
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
    ...mapActions(['login'])
  },
}
</script>