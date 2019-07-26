<template>
  <view class="page">
    <scroll-view scroll-y class="result-list-box">
      <view class="reslut-text" v-for="(item, idx) of resultList" :key='idx'>
        <rich-text :nodes="item"></rich-text>
      </view>
    </scroll-view>
    <view class="ctrls">
      <button class="btn" @click="clickCopy">拷贝内容</button>
      <button class="btn" @click="refresh">刷新</button>
    </view>
  </view>
</template>

<script>
  import commonPageMixin from '@/mixins/common_page'

  export default {
    mixins: [commonPageMixin],
    data() {
      return {}
    },
    onLoad(option) {
      this.getInfo()
    },
    methods: {
      async getInfo() {
        this.resultList = ['获取中...']
        let res = await this.$http.tGet(this.url, {
          num: this.num
        })
        if (res) {
          let resultList = []
          this.resultList = []
          res.forEach(item => {
            let text = ''
            this.keys.forEach(key => {
              text += `${item[key]}<br>`
            })
            resultList.push(text)
          })
          this.resultList = resultList
        }
      },
      clickCopy() {
        uni.setClipboardData({
          data: this.resultList.join(','),
        })
      },
      refresh() {
        this.getInfo()
      },
    }
  }
</script>

<style scoped lang="less">
  .page {
    align-items: center;
  }

  .result-list-box {
    border: 2upx solid #666;
    height: 1000upx;
    border-radius: 8upx;
    padding: 16upx;
  }

  .reslut-text {
    line-height: 64upx;
    padding: 0 8upx 16upx;
    border-bottom: 2upx dashed #666;
    margin-bottom: 16upx;

    &:last-child {
      border-bottom: none;
    }
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
