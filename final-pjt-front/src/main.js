import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
// vuetify
import vuetify from './plugins/vuetify'
// vuetify dialog
import VuetifyDialog from 'vuetify-dialog'

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')

// vuetify dialog
Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
})
document.body.setAttribute('data-app', true)

