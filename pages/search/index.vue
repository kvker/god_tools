<template>
  <view class="page">
    <input class="main-input" placeholder='输入搜索' v-model="searchStr" @input="inputSearch"></input>
    <scroll-view scroll-y class="result-list-box">
      <view class="reslut-text" v-for="(item, idx) of resultList" :key='idx'>{{item}}</view>
    </scroll-view>
  </view>
</template>

<script>
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
    data() {
      return {
        title: '垃圾分类',
        searchStr: '',
        resultList: ['未搜索'],
      }
    },
    mounted() {

    },
    methods: {
      inputSearch() {
        this.resultList = ['......']
        this.$util.doAsyncLast(this.searchResult, 300)
      },
      searchResult() {
        if (!this.searchStr.length) {
          this.resultList = ['未搜索']
          return
        }
        this.$http.tGet('/txapi/surname/', { xing: this.searchStr }, res => {
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
  }

  .reslut-text {
    line-height: 64upx;
    padding: 0 8upx;
  }
</style>
