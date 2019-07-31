<template>
  <view class="page">
    <searcher @input='inputSearch' @confirm='search' @clean='clean' :value='searchStr' :placeholder="placeholder"></searcher>
    <view class="mask-label">
      <text class="text">{{result}}</text>
      <view class="mask"></view>
      <view class="mask"></view>
    </view>
    <view class="ctrls">
      <view class="btn history" @click="showHistory">历史记录</view>
      <view class="btn" @click="clickCopy">复制</view>
    </view>
    <scroll-view scroll-y class="historys">
      <view class="btn line-btn" v-for="(item, idx) of historys" :key='idx' @click="clickHistory(item)">{{item}}</view>
    </scroll-view>
  </view>
</template>

<script>
  import searchMixin from '@/mixins/search'
  import searcher from '@/components/searcher.vue'

  export default {
    mixins: [searchMixin],
    components: {
      searcher,
    },
    data() {
      return {
        // 是否搜索过，用来判断是否刚刚进入
        searched: false,
        sourceRes: null,
        historys: JSON.parse(uni.getStorageSync(this.$storageKeys.IP_HISTORY) || '[]'),
      }
    },
    onLoad(option) {
      this.searchStr = this.$globalData.ipInfo.ip
      if (this.searchStr) {
        uni.showToast({
          title: '本机IP',
          icon: 'none',
        })
        this.searchResult()
      }
    },
    methods: {
      async searchResult() {
        if (!this.searchStr.length) {
          this.result = '请搜索'
          return
        }
        this.result = '获取中...'
        this.searched = true
        let body = {
          num: 10,
          ip: this.searchStr,
        }
        let res = await this.$http.tGet(this.$api.IP_QUERY, body)
        if (res) {
          let sourceRes = res[0]
          this.sourceRes = sourceRes
          this.result =
            `${sourceRes.continent}·${sourceRes.country}·${sourceRes.province}·${sourceRes.city}·${sourceRes.isp}`
        } else {
          this.result = '没有找到'
        }
        this.historys = Array.from(new Set([this.searchStr, ...this.historys]))
        uni.setStorageSync(this.$storageKeys.IP_HISTORY, JSON.stringify(this.historys))
      },
      clickCopy() {
        uni.setClipboardData({
          data: this.searchStr + '：' + this.result,
        })
      },
      clickRandom() {
        this.searchStr = ''
        this.searchResult()
      },
      clean() {
        // console.log('clean')
      },
      clickHistory(item) {
        this.searchStr = item
        this.searchResult()
      },
    },
  }
</script>

<style scoped lang="less">
  .page {
    align-items: center;
  }

  .main-input {
    height: 80upx;
    border: 1px solid #666;
    border-radius: 16upx;
    padding: 0 16upx;
    margin: 0 0 16upx;
  }

  .result-box {
    height: 880upx;
    border-radius: 8upx;
    padding: 64upx;
  }

  .reslut-text {
    line-height: 80upx;
  }

  .ctrls {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin: 16upx 0 48upx;
    
    .history {
      background: #008FFD;
    }
  }
  
  .historys {
    width: 100%;
    height: 800upx;
    padding: 0 16upx;
    
    .line-btn {
      margin-bottom: 16upx;
    }
  }

  .mask-label {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 680upx;
    height: 240upx;
    color: black;
    font-size: 48upx;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    margin: 40upx 0;

    .text {
      position: relative;
      z-index: 1;
    }

    .mask {
      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 4upx solid #161616;
      border-radius: 10upx;
      background: #91CFFF;

      &:nth-child(2) {
        transform: translate(12upx, 12upx);
        background: #D8EEFF;
      }
    }
  }
</style>
