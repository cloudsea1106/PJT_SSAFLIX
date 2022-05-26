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
      <v-card class="bg-black text-white" style="height:300px">
        <v-card-title class="justify-content-center">
          <span class="text-h5 fw-bold py-0 mt-1 mb-1">Signup</span>
        </v-card-title>
        <div class="d-flex justify-content-center align-items-center mt-3" style="height:200px">
          <form @submit.prevent="signup(credentials)">
            <div class="mx-3">
              <label for="username">ID: </label>
              <input v-model="credentials.username" type="text" id="username" placeholder="ID를 입력하세요." class="text-white ms-1" required/>
            </div>
            <div class="mx-3 mt-3">
              <label for="password1">Password: </label>
              <input v-model="credentials.password1" type="password" id="password1" placeholder="8자 이상 작성하세요." class="text-white ms-1" required />
            </div>
            <div class="mx-3 my-3">
              <label for="password2">Password Confirmation:</label>
              <input v-model="credentials.password2" type="password" id="password2" placeholder="한 번 더 입력해주세요." class="text-white ms-1" required />
            </div>

            <div class="d-flex justify-content-end mt-5">
              <button class="btn btn-primary mx-1">Signup</button>
              <button
                class="btn btn-secondary"
                @click="cancelSignup"
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