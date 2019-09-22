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
            let node = ''
            // 如果指定了显示的key
            if (this.keys && this.keys.length) {
              for (let key of this.keys) {
                node += `<div><b>${key}：</b>${item[key]}</div>`
              }
              // 下发纯数组
            } else if (this.arrayOnly) {
              node += `<div>${item}</div>`
              // 未指定则显示全部字段
            } else {
              for (let key in item) {
                if (item.hasOwnProperty(key)) {
                  node += `<div><b>${key}：</b>${item[key]}</div>`
                }
              }
            }
            node += '<hr style="margin: 16px 0;">'
            resultList.push(this.$util.replaceWords(node))
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
  
  scroll-view {
    width: 690upx;
    height: 600upx;
    margin: 40upx 0 28upx;
    padding: 32upx;
    background: #FFD9AD;
    border: 4upx solid black;
    border-radius: 20upx;
    font-size: 24upx;
    font-family: PingFangSC-Regular;
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
