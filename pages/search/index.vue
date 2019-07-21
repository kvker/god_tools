<template>
  <view class="page">
    <input class="main-input" confirm-type='search' placeholder='输入搜索' v-model="searchStr" @input="inputSearch"
      @confirm="search"></input>
    <scroll-view scroll-y class="result-list-box">
      <rich-text :nodes="result"></rich-text>
    </scroll-view>
    <button class="copy-btn" @click="clickCopy">拷贝内容</button>
  </view>
</template>

<script>
  import searchMixin from '@/mixins/search'

  export default {
    mixins: [searchMixin],
    data() {
      return {
        // 请求的path
        path: '',
        // 请求参数的关键字段
        keys: [],
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
      searchResult() {
        if (!this.searchStr.length) {
          this.result = '请搜索'
          return
        }
        let body = {
          num: 10,
        }
        body[this.key] = this.searchStr
        this.$http.tGet(this.path, body, res => {
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
            let regs = [{
              key: new RegExp('name：', 'g'),
              value: '名称：',
            },{
              key: new RegExp('content：', 'g'),
              value: '内容：',
            },{
              key: new RegExp('province：', 'g'),
              value: '省份：',
            },{
              key: new RegExp('city：', 'g'),
              value: '城市：',
            },]
            regs.forEach(item => {
              node=node.replace(item.key, item.value)
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
