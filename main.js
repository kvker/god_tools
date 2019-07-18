import Vue from 'vue'
import App from './App'
import util from './assets/js/util.js'
import http from './assets/js/http.js'
import api from './assets/js/api.js'

Vue.prototype.$util = util
Vue.prototype.$http = http
Vue.prototype.$api = api
Vue.config.productionTip = false
Vue.prototype.$isPro = process.env.NODE_ENV === 'production'

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
