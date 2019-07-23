<template>
  <view class="page">
    <canvas canvas-id="canvas"></canvas>
    <image :src="checkImgUrl" mode="aspectFit"></image>
    <view class="ctrls">
      <button @click="goRabbishCategary" class="button">练习</button>
      <button @click="chooseImage" class="button">图像检索</button>
    </view>
    <view class="search-box">
      <input class="main-input" confirm-type='search' placeholder='输入搜索' v-model="searchStr" @input="inputSearch"
        @confirm="search"></input>
      <scroll-view scroll-y class="result-list-box">
        <view class="reslut-text" v-for="(item, idx) of resultList" :key='idx'>{{item}}</view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import searchMixin from '@/mixins/search'
  import chooseImg2base64 from '@/assets/js/img2base64'

  const results = [{
    name: '可回收物',
    categroy: 1,
  }, {
    name: '有害垃圾',
    categroy: 2,
  }, {
    name: '厨余垃圾',
    categroy: 4,
  }, {
    name: '其他垃圾',
    categroy: 8,
  }]

  export default {
    mixins: [searchMixin],
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
              let matchResult = results.find(i => i.categroy === 2 ** item.type)
              if (matchResult) {
                type = matchResult.name
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
        let res = await chooseImg2base64('canvas')
        this.checkImgUrl = res.filePath
        let checkRes = await this.$http.tPost(this.$api.RUBBISH_UPLOAD_CHECK, {
          img: res.base64,
        })
        if (checkRes) {
          checkRes.forEach(item => {
            let type = ''
            let matchResult = results.find(i => i.categroy === 2 ** item.lajitype)
            if (matchResult) {
              type = matchResult.name
            }
            resultList.push(`${item.keyword}: ${type}(可信度：${item.trust})`)
            this.resultList = resultList
          })
        } else {
          this.resultList = ['没有找到']
        }
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
