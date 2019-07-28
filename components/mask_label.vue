<template>
  <view class="mask-label">
    <text class="text">{{label}}</text>
    <view class="mask"></view>
    <view class="mask"></view>
  </view>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        required: true,
      }
    },
  }
</script>

<style scoped lang='less'>
  .mask-label {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200upx;
    height: 46upx;
    color: black;
    font-size: 28upx;
    font-family: PingFangSC-Semibold;
    font-weight: 600;

    .text {
      position: relative;
      z-index: 1;
    }

    .mask {
      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #FFCB05;
      border: 4upx solid #161616;
      border-radius: 10upx;

      &:nth-child(2) {
        transform: translate(6upx, 6upx);
      }
    }
  }
</style>
