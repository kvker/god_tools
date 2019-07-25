<template>
  <view class="page">
    <image class="logo" src="https://lc-vdtaziqw.cn-e1.lcfile.com/02a252c33a6b0d586203/logo.png" mode="aspectFit"></image>
    <text v-if="!utils.length">加载工具中...</text>
    <view v-else class="utils">
      <!-- #ifdef MP-WEIXIN -->
      <view class="util highlight" @click="jump(item)" v-for="(item, idx) of jumps" :key='idx'>{{item.label}}</view>
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
  import localUtils from '@/assets/json/utils.json'
  console.log(JSON.stringify(require('@/assets/js/regexp.js')))

  export default {
    data() {
      return {
        // 工具列表
        utils: [],
        // 小程序跳转出去的工具
        jumps: [],
      }
    },
    onShow() {
      this.$util.checkUpdate()
    },
    onLoad(option) {
      this.getUtils()
    },
    methods: {
      async getUtils() {
        try {
          let res = await this.$http.avRetrieve('MpUtil')
          this.handleUtils([...localUtils, ...res])
          // 备份工具，防止断网或其他原因挂掉
          uni.setStorage({
            key: this.$storageKeys.STORAGE_UTILS_KEY,
            data: JSON.stringify(res)
          })
        } catch (e) {
          let localStorageUtils = JSON.parse(uni.getStorageSync(STORAGE_UTILS_KEY) || '[]')
          this.handleUtils([...localUtils, ...localStorageUtils])
        }
      },
      jump(item) {
        uni.navigateToMiniProgram({
          appId: item.wxmpid,
          path: '/pages/index/index',
          extraData: {},
          success(res) {
            console.log('跳转成功')
          }
        })
      },
      /**
       * 处理下发的utils对象转换成精简有效的utils数组
       * @param {Object} homepageUtils 下发的Utils列表
       */
      handleUtils(homepageUtils) {
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
        this.utils = utils
        this.jumps = jumps
      },
    },
  }
</script>

<style scoped lang='less'>
  .page {
    align-items: center;
    flex-direction: column;
  }
  
  .logo {
    height: 320upx;
  }

  .utils {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow-y: scroll;
    margin-top: 16upx;

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
