<template>
  <view class="page">
    <input class="main-input" confirm-type='search' :placeholder='placeholder' v-model="searchStr" @input="inputSearch"
      @confirm="search"></input>
    <scroll-view scroll-y class="result-list-box">
      <rich-text :nodes="result"></rich-text>
    </scroll-view>
    <view class="ctrls">
      <button class="btn" @click="clickCopy">拷贝内容</button>
      <button v-if="canRandom" class="btn" @click="clickRandom">随机</button>
      <button v-if="hasPage && searched" class="btn" @click="clickNextPage">下一页</button>
    </view>
  </view>
</template>

<script>
  import searchMixin from '@/mixins/search'
  import commonPageMixin from '@/mixins/common_page'

  export default {
    mixins: [searchMixin, commonPageMixin],
    data() {
      return {
        hasPage: false,
        page: 1,
        // 是否搜索过，用来判断是否刚刚进入
        searched: false,
      }
    },
    onLoad(option) {},
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
          })

          this.result = this.$util.replaceWords(node)
        } else {
          this.result = '没有找到'
        }
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
      clickRandom() {
        this.searchStr = ''
        this.searchResult()
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

  .result-list-box {
    border: 2upx solid #666;
    height: 880upx;
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
