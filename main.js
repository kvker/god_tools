import Vue from 'vue'
import App from './App'
const AV = require('./libs/av-weapp-min.js')

AV.init({
  appId: 'vdTAziqW4rPfnhY0yqR8wXIv-9Nh9j0Va',
  appKey: 'zRCcC5Mg9iOupMgwwGmd54b3',
})

Vue.prototype.$AV = AV
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
