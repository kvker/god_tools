<template>
  <view class="page">
    <image src="/static/logo.png" mode="aspectFit"></image>
    <view class="utils">
      <!-- #ifdef MP-WEIXIN -->
      <view class="util highlight" @click="jump(item, idx)" v-for="(item, idx) of jumps" :key='idx'>{{item.label}}</view>
      <!-- #endif -->
      <navigator class="util" :class="{highlight: item.single}" hover-class="util-hover" v-for="(item, idx) of utils"
        :key='idx' :url="item.path">{{item.label}}</navigator>
    </view>
    <!-- #ifdef MP-WEIXIN -->
    <button class="contact" open-type="contact">问</button>
    <!-- #endif -->
  </view>
</template>

<script>
  import money from '@/components/homepage/money'
  import homepageUtils from '@/assets/js/homepage/utils.js'

  let utils = []
  let jumps = []
  homepageUtils.forEach(util => {
    let {
      label,
      path,
      url,
      params,
      single,
    } = util
    if (path) {
      // 添加顶级参数
      path += `?label=${label}&url=${url}&`
      for (let key in params) {
        if (params.hasOwnProperty(key)) {
          let value = params[key]
          // 如果是数组或对象，则转字符串传入页面
          if (typeof(value) === 'object') {
            path += `${key}=${JSON.stringify(value)}&`
          } else {
            path += `${key}=${value}&`
          }
        }
      }
      utils.push({
        label,
        path,
        single,
      })
    } else {
      jumps.push(util)
    }
  })

  export default {
    components: {
      money,
    },
    data() {
      return {
        utils,
        // 跳转用
        jumps,
      }
    },
    onShow() {
      // #ifdef MP
      const updateManager = uni.getUpdateManager()

      updateManager.onCheckForUpdate(function(res) {
        // 请求完新版本信息的回调
        if (!this.$isPro) {
          console.log('是否有更新：' + res.hasUpdate)
        }
      })

      updateManager.onUpdateReady(function(res) {
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })
      })

      updateManager.onUpdateFailed(function(res) {
        // 新的版本下载失败
      })
      // #endif
    },
    onLoad(option) {
      this.$http.avRetrieve('Engine')
        .then(res => {
          console.log(res)
        })
    },
    methods: {
      jump(item, idx) {
        uni.navigateToMiniProgram({
          appId: item.wxmpid,
          path: '/pages/index/index',
          extraData: {},
          success(res) {
            console.log('跳转成功')
          }
        })
      }
    },
  }
</script>

<style scoped lang='less'>
  .page {
    align-items: center;
    flex-direction: column;
  }

  .utils {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: center;
    overflow-y: scroll;

    .util {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 160upx;
      height: 80upx;
      border: 2upx dashed #666;
      border-radius: 16upx;
      margin-bottom: 8px;
    }

    .util-hover {
      border: 2upx solid #666;
    }
  }
</style>
