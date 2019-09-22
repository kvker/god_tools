<template>
  <view class="page">
    <searcher @input='inputSearch' @confirm='search' :value='searchStr' :placeholder="placeholder"></searcher>
    <view class="mask-label">
      <view class="text">
        <text>{{result}}</text>
      </view>
      <view class="mask"></view>
      <view class="mask"></view>
    </view>
    <view class="ctrls">
      <button class="btn" @click="copy">拷贝</button>
    </view>
  </view>
</template>

<script>
  import searchMixin from '@/mixins/search'
  import commonMixin from '@/mixins/common_page'
  import searcher from '@/components/searcher.vue'

  export default {
    mixins: [searchMixin, commonMixin],
    components: {
      searcher,
    },
    data() {
      return {
        hasPage: false,
        page: 1,
        // 是否搜索过，用来判断是否刚刚进入
        searched: false,
      }
    },
    methods: {
      async searchResult() {
        if (!this.searchStr.length && !this.canRandom) {
          this.result = '请搜索'
          return
        }
        this.result = '获取中...'
        this.searched = true
        let body = {
          num: 10,
          page: this.page,
        }
        // 如果非随机，则插入搜索字段
        if (!this.canRandom) {
          body[this.key] = this.searchStr
        }
        let res = await this.$http.tGet(this.url, body)
        if (res) {
          let node = ''
          res.forEach(item => {
            this.keys.forEach(key => {
              node += item[key] + ' '
            })
          })
          this.result = node.replace(/\n$/, '')
        } else {
          this.result = '没有找到'
        }
      },
      copy() {
        uni.setClipboardData({
          data: this.result + '\n技术支持：只有神才知道的工具合集',
        })
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

  .ctrls {
    display: flex;
    justify-content: space-around;
    width: 100%;

    .btn {
      margin-top: 16upx;
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
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    margin: 40upx 0;

    .text {
      position: relative;
      display: flex;
      align-items: center;
      height: 120px;
      padding: 16upx;
      font-size: 32upx;
      overflow-y: scroll;
      word-break: break-all;
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
