import Vue from 'vue'
import App from './App'
import util from './assets/js/util'
import http from './assets/js/http'
import api from './assets/js/data/api'
import classs from './assets/js/data/classs'
import storageKeys from './assets/js/data/storage_keys'
import dayjs from 'dayjs'
// import maskLabel from './components/mask_label'

Vue.prototype.$util = util
Vue.prototype.$dayjs = dayjs
Vue.prototype.$http = http
Vue.prototype.$api = api
Vue.prototype.$classs = classs
Vue.prototype.$storageKeys = storageKeys
Vue.config.productionTip = false
Vue.prototype.$isPro = process.env.NODE_ENV === 'production'
// 全局数据
Vue.prototype.$globalData = {}

App.mpType = 'app'

Vue.mixin({
  // 这里设置组件无效，艹
  components: {
    // maskLabel,
  },
  onShareAppMessage(res) {
    return {
      title: this.title || '只有神才知道的工具合集',
    }
  },
  methods: {
    /**
     * 带有超时时间的showLoading
     */
    showLoading(title = '请求中...', timeout = 15) {
      uni.showLoading({
        title,
        mask: false,
      })
      setTimeout(() => {
        uni.hideLoading()
      }, timeout * 1000)
    }
  }
})

const app = new Vue({
  ...App
})
app.$mount()
