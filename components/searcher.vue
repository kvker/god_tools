<template>
  <view class="search-box">
    <image class="icon" :placeholder="placeholder" :src="img.searchIcon" mode="aspectFit"></image>
    <input class="search-input" :placeholder="placeholder" confirm-type='search' :value="value" @input="$emit('input', $event)"
      @confirm="$emit('confirm', $event)"></input>
    <text class="clean" @click="clean">X</text>
  </view>
</template>

<script>
  import img from '@/assets/js/data/img.js'

  export default {
    props: {
      value: {
        type: String,
      },
      placeholder: {
        type: String,
        default: '请搜索',
      }
    },
    data() {
      return {
        searchStr: '',
        img,
      }
    },
    methods: {
      clean() {
        this.$emit('clean')
        this.$emit('input', { detail: { value: '' } })
      }
    }
  }
</script>

<style scoped lang="less">
  .search-box {
    position: relative;
    width: 690upx;
    height: 88upx;
    border: 4upx solid black;
    border-radius: 6upx;
    background: white;
    margin: 0 auto;

    .icon,
    .clean {
      position: absolute;
      top: 22upx;
      width: 50upx;
      height: 40upx;
    }

    .icon {
      left: 26upx;
    }

    .search-input {
      width: 100%;
      height: 100%;
      font-size: 38upx;
      font-family: PingFangSC-Regular;
      padding: 0 16upx 0 80upx;
      color: black;
    }

    .clean {
      right: 26upx;
      text-align: right;
      z-index: 2;
    }
  }
</style>
