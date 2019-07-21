<template>
  <view class="page">
    <picker class="button" @change="changePicker" :value="index" :range="values">
      <view class="uni-input">{{values[index]}}</view>
    </picker>
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
        // 请求的path
        path: '',
        // 请求关键字段
        key: '',
        // 显示的关键字段
        keys: [],
        // 选择的关键字段
        values: [],
        index: 0,
        title: '',
        searchStr: '',
        resultList: ['......'],
      }
    },
    onLoad(option) {
      try {
        this.path = option.path
        this.title = option.title
        this.key = option.key
        this.num = option.num || 10
        this.keys = JSON.parse(option.keys)
        this.values = JSON.parse(option.values)
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
      changePicker(e) {
        this.index = +e.target.value
        this.getInfo()
      },
      getInfo() {
        this.resultList = ['......']
        let body = {
          num: this.num
        }
        body[this.key] = this.index + 1
        this.$http.tGet(this.path, body, res => {
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
  
  .button {
    margin-bottom: 8px;
  }

  .result-list-box {
    border: 2upx solid #666;
    height: 800upx;
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
