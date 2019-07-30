<template>
  <view class="page">
    <searcher @input='inputSearch' @confirm='search' @clean='clean' :value='searchStr' :placeholder="placeholder"></searcher>
    <scroll-view scroll-y class="result-box">
      <rich-text :nodes="result"></rich-text>
    </scroll-view>
    <view class="ctrls">
      <button class="btn" @click="clickCopy">拷贝内容</button>
    </view>
  </view>
</template>

<script>
  import searchMixin from '@/mixins/search'
  import commonPageMixin from '@/mixins/common_page'
  import searcher from '@/components/searcher.vue'

  export default {
    mixins: [searchMixin, commonPageMixin],
    components: {
      searcher,
    },
    data() {
      return {
        // 是否搜索过，用来判断是否刚刚进入
        searched: false,
        sourceRes: null,
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
          let node = ''
          res.forEach(item => {
            for (let key in item) {
              if (item.hasOwnProperty(key)) {
                node += `<div><b>${key}：</b>${item[key]}</div>`
              }
            }
          })
          this.sourceRes = res[0]
          this.result = this.$util.replaceWords(node)
        } else {
          this.result = '没有找到'
        }
      },
      clickCopy() {
        let str = ''
        for (let key in this.sourceRes) {
          str += `${key}：${this.sourceRes[key]}\n`
        }
        uni.setClipboardData({
          data: this.$util.replaceWords(str),
        })
      },
      clickRandom() {
        this.searchStr = ''
        this.searchResult()
      },
      clean() {
        // console.log('clean')
      }
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

    .btn {
      margin-top: 16upx;
    }
  }
</style>
