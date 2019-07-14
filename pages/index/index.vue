<template>
  <view class="page">
    <view class="search-box">
      <text class="result">结果：{{result}}</text>
      <input class="main-input" placeholder='输入搜索' v-model="searchStr" @input="inputSearch"></input>
    </view>
    <button @click="goRabbishCategary" class="title">垃圾分类题</button>
  </view>
</template>

<script>
  import rubbishs from '@/assets/rubbish.json'
  
  
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
        result: '未搜索',
      }
    },
    mounted() {

    },
    methods: {
      goRabbishCategary() {
        uni.navigateTo({
          url: `/pages/rubbish_categary/index`
        })
      },
      inputSearch() {
        this.result = '......'
        this.$util.doAsyncLast(this.searchResult, 300)
      },
      searchResult() {
        let rubbish = rubbishs.find(i => i.name === this.searchStr)
        if (rubbish) {
          this.result = (results.find(i => i.categroy === rubbish.categroy) || {}).name
        } else {
          // 如果是空字符
          if (!this.searchStr) {
            this.result = '未搜索'
          } else {
            this.result = '没有找到'
          }
        }
      },
    }
  }
</script>

<style>
  .page {
    align-items: center;
  }

  .main-input {
    height: 80upx;
    border: 1px solid green;
    border-radius: 16upx;
    padding: 0 16upx;
    margin: 8upx 0 0;
  }

  .result {
    color: red;
    font-size: 32upx;
  }

  .search-box {
    margin: 240upx 0 32upx;
  }
</style>
