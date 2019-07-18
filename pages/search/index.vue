<template>
  <view class="page">
    <input class="main-input" confirm-type='search' placeholder='输入搜索' v-model="searchStr" @confirm="inputSearch"></input>
    <scroll-view scroll-y class="result-list-box">
      <rich-text :nodes="result"></rich-text>
    </scroll-view>
    <button class="copy-btn" @click="clickCopy">拷贝内容</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 请求的path
        path: '',
        // 请求参数的关键字段
        keys: [],
        searchStr: '',
        result: '未搜索',
      }
    },
    onLoad(option) {
      this.path = option.path
      this.key = option.key
      uni.setNavigationBarTitle({
        title: option.title
      })
    },
    methods: {
      inputSearch() {
        this.result = '......'
        this.searchResult()
      },
      searchResult() {
        if (!this.searchStr.length) {
          this.result = '未搜索'
          return
        }
        let body = {}
        body[this.key] = this.searchStr
        this.$http.tGet(this.path, body, res => {
          if (res) {
            this.result = res[0].content
          } else {
            this.result = '没有找到'
          }
        })
      },
      clickCopy() {
        uni.setClipboardData({
          data: this.result,
        })
      },
    }
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

  .result-list-box {
    border: 2upx solid #666;
    height: 800upx;
    border-radius: 8upx;
    padding: 16upx;
  }

  .reslut-text {
    line-height: 64upx;
    padding: 0 8upx;
  }

  .copy-btn {
    margin-top: 16upx;
  }
</style>
