import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import './plugins/axios'
import './plugins/vee-validate'
import './utils/filters'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  el: '#app',
  components: { App },
  store,
  render: (h) => h(App)
})
