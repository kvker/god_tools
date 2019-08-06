<template>
  <view class="input-dream">
    <text class="title">{{title}}</text>
    <input :type="type" class="input" :placeholder="placeholder" @input="$emit('input', $event)">
    <text class="remind">{{remind}}</text>
  </view>
</template>

<script>
export default {
  props: {
    title: String,
    placeholder: String,
    remind: String,
    type: String,
  }
}
</script>

<style scoped lang='less'>
  @import '~@/assets/css/target_bill/main.less';

.input-dream {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .title {
    color: #983F24;
    font-size: 36upx;
  }
  
  .input {
    .inputBorder();
    width: 550upx;
    height: 90upx;
    border: 4upx solid #FED6A4;
    border-radius: 16upx;
    margin: 10upx 0;
  }
  
  .remind {
    display: inline-block;
    width: 100%;
    font-size: 20upx;
    text-align: right;
    color: #999;
  }
}
</style>