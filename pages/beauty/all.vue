<template>
  <view class="page">
    <image class="img" v-for="(item, idx) of infos" :key='idx' :src="item" mode="aspectFill" @click="preview(item, idx)"></image>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        infos: [],
        currentIndex: 0,
      }
    },
    onLoad(option) {
      this.getInfos(option.url, option.format)
    },
    methods: {
      async getInfos(url, format) {
        let res = await this.$http.tGet(this.$api.HTML2PIC, {
          url,
          format,
        })
        if(res) {
          this.infos = Array.from(new Set(res.map(i => i.picUrl)))
        }
      },
      preview(item, idx) {
        this.currentIndex = idx
        uni.previewImage({
          current: this.currentIndex,
          urls: this.infos,
        })
      },
    }
  }
</script>

<style scoped lang="less">
  .page {
    display: block;
    text-align: center;
  }
  .img {
    width: 650upx;
    height: 720upx;
    margin: 30upx 0;
    border: 4upx solid black;
    border-radius: 20upx;
    margin-bottom: 32upx;
  }
</style>
