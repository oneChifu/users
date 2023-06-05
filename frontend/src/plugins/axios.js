import Vue from 'vue'
import axios from 'axios'

// axios.defaults.baseURL = process.env.VUE_APP_URL
// axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// axios.defaults.headers['Access-Control-Allow-Origin'] = '*'

Vue.prototype.$http = axios

export default Vue.prototype.$http
