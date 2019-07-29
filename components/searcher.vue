<template>
  <view class="search-box">
    <image class="icon" :placeholder="placeholder" :src="img.searchIcon"
      mode="aspectFit"></image>
    <input class="search-input" :placeholder="placeholder" confirm-type='search' :value="value" @input="$emit('input', $event)" @confirm="$emit('confirm', $event)"></input>
  </view>
</template>

<script>
  import searchMixin from '@/mixins/search'
  import img from '@/assets/js/data/img.js'

  export default {
    mixins: [searchMixin],
    props: {
      value: {
        type: String,
      },
    },
    data() {
      return {
        searchStr: '',
        placeholder: '请搜索',
        img,
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

    .icon {
      position: absolute;
      left: 26upx;
      top: 22upx;
      width: 50upx;
      height: 40upx;
    }

    .search-input {
      width: 100%;
      height: 100%;
      font-size: 38upx;
      font-family: PingFangSC-Regular;
      padding: 0 16upx 0 80upx;
      color: black;
    }
  }
</style>
