<template>
  <view class="page">
    <image class="logo" src="https://lc-vdtaziqw.cn-e1.lcfile.com/f46958c978de7292f540/god_utils_header.png" mode="aspectFill"></image>
    <text v-if="!utils.length">加载工具中...</text>
    <scroll-view scroll-y v-else class="utils-area">
      <view class="utils-group">
        <view class="group-title-box">
          <image class="v-line" :src="vLineUrl" mode=""></image>
          <view class="group-title">
            <text>日常工具</text>
            <view class="mask"></view>
            <view class="mask"></view>
          </view>
          <image class="v-line" :src="vLineUrl" mode=""></image>
        </view>
        <view class="utils">
          <!-- #ifdef MP-WEIXIN -->
          <view class="util highlight" @click="jump(item)" v-for="(item, idx) of jumps" :key='idx'>{{item.label}}</view>
          <!-- #endif -->
          <view class="util" :class="{highlight: item.single}" v-for="(item, idx) of utils" :key='idx' @click="doNavi(item)">{{item.label}}</view>
        </view>
        <view class="group-title-box">
          <image class="v-line" :src="vLineUrl" mode=""></image>
          <view class="group-title">
            <text>每日学习</text>
            <view class="mask"></view>
            <view class="mask"></view>
          </view>
          <image class="v-line" :src="vLineUrl" mode=""></image>
        </view>
        <view class="group-title-box">
          <image class="v-line" :src="vLineUrl" mode=""></image>
          <view class="group-title">
            <text>每日段子</text>
            <view class="mask"></view>
            <view class="mask"></view>
          </view>
          <image class="v-line" :src="vLineUrl" mode=""></image>
        </view>
      </view>
    </scroll-view>
    <!-- #ifdef MP-WEIXIN -->
    <button class="contact" open-type="contact">问</button>
    <!-- #endif -->
  </view>
</template>

<script>
  const classs = 'MpUtil'

  export default {
    data() {
      return {
        // 工具列表
        utils: [],
        // 小程序跳转出去的工具
        jumps: [],
        // 维护中被隐藏的工具
        hiddens: [],
        vLineUrl: 'https://lc-vdtaziqw.cn-e1.lcfile.com/4575142956cc21460df2/god_utils_v_line.png',
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
          let res = await this.$http.avRetrieve(classs, query => {
            // 按照点击次数降序排列
            query.descending('click_count')
          })
          this.handleUtils(res)
          // 备份工具，防止断网或其他原因挂掉
          uni.setStorage({
            key: this.$storageKeys.STORAGE_UTILS_KEY,
            data: JSON.stringify(res)
          })
        } catch (e) {
          let localStorageUtils = JSON.parse(uni.getStorageSync(this.$storageKeys.STORAGE_UTILS_KEY) || '[]')
          this.handleUtils(localStorageUtils)
        }
      },
      /**
       * 点击进入工具
       */
      doNavi(item) {
        // 点击数自增一个
        if (item.objectId) {
          let util = this.$http.avObject.createWithoutData(classs, item.objectId)
          util.increment('click_count')
          util.save()
        }
        uni.navigateTo({
          url: item.path,
        })
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
          // 如果配置了隐藏，则pass，主要维护时候避免版本迭代挂掉
          if (util.hidden) {
            this.hiddens.push(util)
            return
          }

          let {
            label,
            path,
            url,
            params,
            single,
            objectId,
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
              objectId,
            })
          } else {
            jumps.push(util)
          }
        })
        this.utils = utils
        this.jumps = jumps

        // 如果有被隐藏的工具，则提示
        if (this.hiddens.length) {
          let hiddenUtilNames = this.hiddens.map(i => i.label)
          uni.showModal({
            title: '提示',
            content: `${hiddenUtilNames.join('、')}正在维护中，带来不便，实在抱歉`,
            showCancel: false,
            confirmText: '朕晓得了',
          })
        }
      },
    },
  }
</script>

<style scoped lang='less'>
  .page {
    align-items: center;
    flex-direction: column;
    padding: 0;
  }

  .logo {
    width: 100%;
    height: 300upx;
  }

  .v-line {
    width: 145upx;
    height: 7upx;
  }

  .utils-area {
    width: 100%;
    height: calc(100vh - 300upx);

    .utils-group {
      width: 100%;

      .group-title-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 52upx 0 37upx;

        .group-title {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 200upx;
          height: 46upx;
          margin: 0 27upx;
          color: black;
          font-size: 28upx;
          font-family: PingFangSC-Semibold;
          font-weight: 600;

          .mask {
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #FFCB05;
            border: 3upx solid #161616;
            border-radius: 10upx;

            &:nth-child(2) {
              transform: translate(6upx, 6upx);
            }
          }
        }
      }

      .utils {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

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
      }
    }
  }
</style>
