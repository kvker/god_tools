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
