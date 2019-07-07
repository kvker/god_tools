<template>
  <view class="page">
    <button @click="goRabbishCategary" class="title">{{title}}</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: '垃圾分类'
    }
  },
  mounted() {
    uni.login({
      provider: 'weixin',
      success: function(loginRes) {
        console.log(loginRes)
        console.log(loginRes.authResult)
      }
    })
  },
  methods: {
    goRabbishCategary() {
      uni.navigateTo({
        url: `/pages/rubbish_categary/index`
      })
    }
  }
}
</script>

<style>
.page {
  justify-content: center;
  align-items: center;
}
</style>
