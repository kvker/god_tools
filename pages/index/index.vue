<template>
  <view class="page">
    <button @click="goRabbishCategary" class="title">垃圾分类题</button>
    <view class="search-box">
      <input class="main-input" placeholder='输入搜索' v-model="searchStr" @input="inputSearch"></input>
      <text v-if="result" class="result">结果：{{result}}</text>
    </view>
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
        result: '',
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
        let rubbish = rubbishs.find(i => i.name === this.searchStr)
        if (rubbish) {
          this.result = (results.find(i => i.categroy === rubbish.categroy) || {}).name
        } else {
          this.result = '没有找到'
        }
      },
    }
  }
</script>

<style>
  .page {
    justify-content: center;
    align-items: center;
  }
  .main-input {
    border: 1px solid green;
  }
  .result {
    color: red;
  }
</style>
