<template>
  <view class="page">
    <canvas canvas-id="canvas"></canvas>
    <searcher class='searcher' @confirm="searchResult" @input='inputSearch' :value='searchStr' :placeholder="placeholder"></searcher>
    <scroll-view scroll-y class="result-list-box">
      <view class="reslut-text" v-for="(item, idx) of resultList" :key='idx'>{{item}}</view>
    </scroll-view>
    <view ref='view' class="ctrls">
      <view class="ctrl" @click="goRabbishCategary">
        <mask-label class='mask' label="分类练习"></mask-label>
        <text>戳我！！！</text>
        <text>垃圾知多少？</text>
        <image :src="img.knowledge"></image>
      </view>
      <view class="ctrl" @click="chooseImage">
        <mask-label class='mask' label="垃圾识别"></mask-label>
        <text>这是什么垃圾？</text>
        <text>点我搜一下。</text>
        <image :src="img.check"></image>
      </view>
    </view>
    <image class="search-img" :src="checkImgUrl" mode="aspectFit"></image>
  </view>
</template>

<script>
  import commonPageMixin from '@/mixins/common_page'
  import searcher from '@/components/searcher'
  import maskLabel from '@/components/mask_label'

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
    mixins: [commonPageMixin],
    components: {
      searcher,
      maskLabel,
    },
    data() {
      return {
        title: '',
        checkImgUrl: '',
      }
    },
    onLoad() {
      this.getHot()
    },
    methods: {
      /**
       * 热搜
       */
      async getHot() {
        let resultList = ['(今日热搜)']
        let res = await this.$http.tGet(this.$api.RUBBISH_HOT)
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
      },
      inputSearch(e) {
        this.searchStr = e.detail.value
      },
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
    background: #EFFFF5;
  }

  .border() {
    border: 4upx solid #161616;
  }

  .searcher {
    margin: 28upx 0;
  }

  canvas {
    position: absolute;
    left: -10000px;
    top: 0;
    width: 2000px;
    height: 2000px;
  }

  .ctrls {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    margin: 100upx 0 32upx;

    .ctrl {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 330upx;
      height: 306upx;
      border: 4upx solid black;
      border-radius: 6upx;
      background: white;

      text {
        line-height: 48upx;
        margin-left: 32upx;

        &:nth-child(2) {
          margin-top: 60upx;
        }
      }

      image {
        align-self: flex-end;
        width: 174upx;
        height: 162upx;
        margin-right: 20upx;
      }

      .mask {
        position: absolute;
        top: -36upx;
        left: 62upx;
      }
    }
  }

  .result-list-box {
    width: 690upx;
    height: 350upx;
    .border();
    border-radius: 6upx;
    background: white;
    padding: 12upx 24upx;

    .reslut-text {
      width: 100%;
      line-height: 48upx;
      font-size: 24upx;
      font-family: PingFangSC-Regular;
    }
  }

  .search-img {
    @size: 200upx;
    width: @size;
    height: @size;
  }
</style>
