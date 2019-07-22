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
  import regs from '@/assets/js/regexp.js'

  export default {
    data() {
      return {
        // 请求的url
        url: '',
        // 请求参数的关键字段
        keys: [],
        title: '',
        searchStr: '',
        resultList: ['获取中...'],
      }
    },
    onLoad(option) {
      console.log(option)
      try {
        this.url = option.url
        this.title = option.title
        this.num = option.num || 10
        this.keys = JSON.parse(option.keys)
        uni.setNavigationBarTitle({
          title: option.title
        })
        this.getInfo()
      } catch (e) {
        console.log(e)
        throw '参数不足'
      }
    },
    methods: {
      getInfo() {
        this.resultList = ['获取中...']
        this.$http.tGet(this.url, {
          num: this.num
        }, res => {
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
        })
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
