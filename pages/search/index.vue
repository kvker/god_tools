<template>
  <view class="page">
    <input class="main-input" confirm-type='search' placeholder='输入搜索' v-model="searchStr" @input="inputSearch"
      @confirm="search"></input>
    <scroll-view scroll-y class="result-list-box">
      <rich-text :nodes="result"></rich-text>
    </scroll-view>
    <view class="ctrls">
      <button class="btn" @click="clickCopy">拷贝内容</button>
      <button v-if="hasPage && searched" class="btn" @click="clickNextPage">下一页</button>
    </view>
  </view>
</template>

<script>
  import searchMixin from '@/mixins/search'
  import regs from '@/assets/js/regexp.js'

  export default {
    mixins: [searchMixin],
    data() {
      return {
        // 请求的url
        url: '',
        // 请求参数的关键字段
        keys: [],
        hasPage: false,
        page: 1,
        // 是否搜索过，用来判断是否刚刚进入
        searched: false,
      }
    },
    onLoad(option) {
      this.url = option.url
      this.key = option.key
      this.hasPage = !!option.hasPage
      uni.setNavigationBarTitle({
        title: option.label
      })
    },
    methods: {
      searchResult() {
        if (!this.searchStr.length) {
          this.result = '请搜索'
          return
        }
        this.result = '获取中...'
        this.searched = true
        let body = {
          num: 10,
          page: this.page,
        }
        body[this.key] = this.searchStr
        this.$http.tGet(this.url, body, res => {
          if (res) {
            let node = ''
            res.forEach(item => {
              for (let key in item) {
                if (item.hasOwnProperty(key)) {
                  node += `<div><b>${key}：</b>${item[key]}</div>`
                }
              }
              node += '<hr style="margin: 16px 0;">'
            })

            regs.forEach(item => {
              node = node.replace(item.key, item.value)
            })
            this.result = node
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
      clickNextPage() {
        this.page++
        this.searchResult()
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

  .ctrls {
    display: flex;
    justify-content: space-around;
    width: 100%;

    .btn {
      margin-top: 16upx;
    }
  }
</style>
