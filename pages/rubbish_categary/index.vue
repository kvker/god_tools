<template>
  <view class="page">
    <canvas canvas-id="canvas"></canvas>
    <image :src="checkImgUrl" mode="aspectFit"></image>
    <view ref='view' class="ctrls">
      <button @click="goRabbishCategary" class="button">练习</button>
      <button @click="chooseImage" class="button">图像检索</button>
    </view>
    <view class="search-box">
      <input class="main-input" confirm-type='search' :placeholder='placeholder' v-model="searchStr" @input="inputSearch"
        @confirm="search"></input>
      <scroll-view scroll-y class="result-list-box">
        <view class="reslut-text" v-for="(item, idx) of resultList" :key='idx'>{{item}}</view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import searchMixin from '@/mixins/search'
  import commonPageMixin from '@/mixins/common_page'

  const results = [{
    name: '可回收物',
    category: 1,
  }, {
    name: '有害垃圾',
    category: 2,
  }, {
    name: '厨余垃圾',
    category: 4,
  }, {
    name: '其他垃圾',
    category: 8,
  }]

  export default {
    mixins: [searchMixin, commonPageMixin],
    data() {
      return {
        title: '垃圾分类',
        checkImgUrl: '',
      }
    },
    methods: {
      goRabbishCategary() {
        uni.navigateTo({
          url: `/pages/rubbish_categary/question/index`
        })
      },
      async searchResult() {
        if (!this.searchStr.length) {
          this.resultList = ['请搜索']
          return
        }
        this.resultList = ['获取中...']
        let res = await this.$http.tGet(this.$api.RUBBISH_CATEGORY, {
          word: this.searchStr
        })
        if (res) {
          let resultList = []
          if (res) {
            res.forEach(item => {
              let type = ''
              let matchResult = results.find(i => i.category === 2 ** item.type)
              if (matchResult) {
                type = matchResult.name
              } else {
                type = '未知类型'
              }
              resultList.push(`${item.name}: ${type}`)
            })
          }
          this.resultList = resultList
        } else {
          this.resultList = ['没有找到']
        }
      },
      async chooseImage() {
        let canvasId = 'canvas'
        uni.chooseImage({
          count: 1,
          success: async imgRes => {
            let filePath = imgRes.tempFilePaths[0]
            this.checkImgUrl = filePath

            let res = await this.$util.img2Base64(filePath, canvasId)
            this.resultList = ['获取中...']
            let checkRes = await this.$http.tPost(this.$api.RUBBISH_UPLOAD_CHECK, {
              img: res.base64,
            })
            if (checkRes) {
              let resultList = []
              checkRes.forEach(item => {
                let type = ''
                let matchResult = results.find(i => {
                  return i.category === 2 ** item.lajitype
                })
                if (matchResult) {
                  type = matchResult.name
                } else {
                  type = '未知类型'
                }
                resultList.push(`${item.name}: ${type}（可信度：${item.trust}）`)
                this.resultList = resultList
              })
            } else {
              this.resultList = ['没有找到']
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .page {
    align-items: center;
  }

  canvas {
    position: absolute;
    left: -10000px;
    top: 0;
    width: 2000px;
    height: 2000px;
  }

  image {
    position: absolute;
    @size: 200upx;
    width: @size;
    height: @size;
  }

  .ctrls {
    display: flex;
    width: 400upx;
    justify-content: space-between;
    margin: 240upx 0 32upx;
  }

  .search-box {
    width: 100%;

    .main-input {
      height: 80upx;
      border: 1px solid #666;
      border-radius: 16upx;
      padding: 0 16upx;
      margin: 0 0 16upx;
    }

    .result-list-box {
      border: 2upx solid #666;
      height: 600upx;
      border-radius: 8upx;
    }

    .reslut-text {
      line-height: 64upx;
      padding: 0 8upx;
    }
  }
</style>
