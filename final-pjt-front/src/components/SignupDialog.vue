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
          SignUp
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="justify-content-center">
          <span class="text-h5">Signup</span>
        </v-card-title>
        <form @submit.prevent="signup(credentials)">
          <div>
            <label for="username">Username: </label>
            <input  v-model="credentials.username" type="text" id="username" required/>
          </div>
          <div>
            <label for="password1">Password: </label>
            <input v-model="credentials.password1" type="password" id="password1" required />
          </div>
          <div>
            <label for="password2">Password Confirmation:</label>
            <input v-model="credentials.password2" type="password" id="password2" required />
          </div>
          <div>
            <button class="btn btn-primary">Signup</button>
          </div>
        </form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <button
            class="btn btn-secondary"
            @click="cancelSignup"
          >
            Cancel
          </button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, /*mapGetters*/ } from 'vuex'
// import AccountErrorList from '@/components/AccountErrorList.vue'

export default {
  name: 'SignupView',
  // components: {
  //   AccountErrorList,
  // },
  data() {
    return {
      dialog: false,
      credentials: {
        username: '',
        password1: '',
        password2: '',
      }
    }
  },
  // computed: {
  //   ...mapGetters(['authError'])
  // },
  methods: {
    ...mapActions(['signup']),
    cancelSignup: function () {
      this.credentials.username = ''
      this.credentials.password1 = ''
      this.credentials.password2 = ''
      this.dialog = false
    }
  },
}
</script>