<template>
  <view class="page">
    <image class="logo" :src="img.homeHeader" mode="aspectFill"></image>
    <text v-if="!utilGroups.length">加载工具中...</text>
    <scroll-view scroll-y v-else class="utils-area">
      <!-- #ifdef MP-TOUTIAO -->
      <ad unit-id="adunit-6e37r5hphrj506e947"></ad>
      <!-- #endif -->
      <view class="utils-group" v-for="(group, idx) of utilGroups" :key='idx'>
        <view class="group-title-box">
          <image class="v-line" :src="img.vLineUrl" mode="aspectFill"></image>
          <mask-label class='mask' :label="group.label"></mask-label>
          <image class="v-line" :src="img.vLineUrl" mode="aspectFill"></image>
        </view>
        <view class="utils">
          <!-- #ifdef MP -->
          <view class="util jump" @click="jump(item, idx, jidx)" v-for="(item, jidx) of group.jumps" :key='jidx'>{{item.label}}</view>
          <!-- #endif -->
          <view class="util" v-for="(item, uidx) of group.utils" :key='uidx' @click="doNavi(item, idx, uidx)">{{item.label}}</view>
        </view>
      </view>
      <!-- #ifdef MP-TOUTIAO -->
      <ad unit-id="adunit-6e37r5hphrj506e947"></ad>
      <!-- #endif -->
    </scroll-view>
    <!-- #ifdef MP-WEIXIN -->
    <button class="contact" open-type="contact">问</button>
    <!-- #endif -->
  </view>
</template>

<script>
  import maskLabel from '@/components/mask_label'
  import commonPageMixin from '@/mixins/common_page.js'

  const classs = 'MpUtil'

  export default {
    mixins: [commonPageMixin],
    components: {
      maskLabel,
    },
    data() {
      return {
        // 分组数据
        utilGroups: [],
        // 维护中被隐藏的工具
        hiddens: [],
      }
    },
    onShow() {
      this.$util.checkUpdate()
    },
    onLoad(option) {
      this.getUtils()
      this.getAddress()
    },
    methods: {
      async getAddress() {
        this.$globalData.ipInfo = {
          province: '北京',
          city: '北京',
          ip: '',
        }
        let res = await this.$http.kGet('/api/ip')
        let ip = res.ip
        res = await this.$http.tGet(this.$api.IP_QUERY, { ip: res.ip })
        if (res) {
          this.$globalData.ipInfo = res[0]
        } else {
          this.$globalData.ipInfo = {
            province: '北京',
            city: '北京',
          }
        }
        this.$globalData.ipInfo.ip = ip
      },
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
      doNavi(item, idx, uidx) {
        item = this.utilGroups[idx].utils[uidx]
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
      jump(item, idx, jidx) {
        item = this.utilGroups[idx].jumps[jidx]
        // #ifdef MP-TOUTIAO
        tt.navigateToMiniProgram({
          appId: item.ttmpid,
          path: '/pages/index/index',
          extraData: {},
          success(res) {}
        })
        console.log(item.ttmpid)
        // #endif
        
        // #ifdef MP-WEIXIN
        uni.navigateToMiniProgram({
          appId: item.wxmpid,
          path: '/pages/index/index',
          extraData: {},
          success(res) {}
        })
        // #endif
      },
      /**
       * 处理下发的utils对象转换成精简有效的utils数组
       * @param {Object} homepageUtils 下发的Utils列表
       */
      handleUtils(homepageUtils) {
        let utilGroups = [{
            label: '日常工具',
            // 工具列表
            utils: [],
            // 小程序跳转出去的工具
            jumps: [],
          },
          {
            label: '每日学习',
            // 工具列表
            utils: [],
            jumps: [],
          },
          {
            label: '每日段子',
            // 工具列表
            utils: [],
            jumps: [],
          },
          {
            label: '其他工具',
            // 工具列表
            utils: [],
            jumps: [],
          },
        ]
        homepageUtils.forEach(util => {
          // 如果配置了隐藏，则pass，主要维护时候避免版本迭代挂掉，测试环境可打开
          if (this.$isPro && util.hidden) {
            this.hiddens.push(util)
            return
          }

          let utils = []
          let jumps = []

          let {
            label,
            path,
            url,
            params,
            single,
            account,
            objectId,
          } = util

          utilGroups.forEach(group => {
            if (util.type === group.label) {
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
                                
                if (account) {
                  // #ifdef MP-WEIXIN
                  group.utils.push({
                    label,
                    path,
                    single,
                    objectId,
                  })
                  // #endif
                } else {
                  // #ifdef MP-TOUTIAO
                  if(util.level >= 8) return
                  // #endif
                  group.utils.push({
                    label,
                    path,
                    single,
                    objectId,
                  })
                }
              } else {
                // #ifdef MP-TOUTIAO
                // 头条Android支持，iOS不支持
                if (uni.getSystemInfoSync().platform == "android") {
                  group.jumps.push(util)
                }
                return
                // #endif
                group.jumps.push(util)
              }
            }
          })
        })

        this.utilGroups = utilGroups

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
    background: #FFFFF8;
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
    margin-bottom: 24upx;

    .border() {
      border: 4upx solid #161616;
    }

    .utils-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      .group-title-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 52upx 0 37upx;

        .mask {
          margin: 0 28upx;
        }
      }

      .utils {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        width: 690upx;
        background: #91CFFF;
        .border();
        border-radius: 10px;
        padding: 15upx 0;

        .util {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 200upx;
          height: 80upx;
          .border();
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          margin: 15upx 0;
          background: white;
          color: black;
        }
        
        .jump {
          border: 2upx dashed #F3944E;
          color: #F3944E;
        }
      }
    }
  }
</style>
