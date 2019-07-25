import Vue from 'vue'
import App from './App'
import util from './assets/js/util.js'
import http from './assets/js/http.js'
import api from './assets/js/data/api.js'
import storageKeys from './assets/js/data/storage_keys.js'

Vue.prototype.$util = util
Vue.prototype.$http = http
Vue.prototype.$api = api
Vue.prototype.$storageKeys = storageKeys
Vue.config.productionTip = false
Vue.prototype.$isPro = process.env.NODE_ENV === 'production'

App.mpType = 'app'

Vue.mixin({
  onShareAppMessage(res) {
    console.log(this.title)
    return {
      title: this.title || '只有神才知道的工具合集',
    }
  }
})

const app = new Vue({
  ...App
})
app.$mount()
