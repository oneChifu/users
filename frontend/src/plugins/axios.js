import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$http = axios

export default Vue.prototype.$http
