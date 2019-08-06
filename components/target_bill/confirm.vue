<template>
  <view class="confirm model">
    <view class="content">
      <text class="title">{{title}}</text>
      <input type="digit" class="input" v-model='price' placeholder='0'>
      <view class="marks">
        <view v-for='(mark, idx) of marks' :key='idx' :class='idx === currentIndex ? "btn mark selected" : "btn mark"' @click='clickMark(mark, idx)'>{{mark}}</view>
      </view>
      <view class="btn click" @click='clickConfirm'>确定</view>
      <view class="close" @click='$emit("close")'>
        <image class="close-img" src="http://file.kvker.com/4c6a5df82f7a5c95076c/little_target_bill_close.png"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    type: Number,
    show: Boolean,
  },
  data() {
    return {
      marks: [],
      title: '',
      price: '',
      currentIndex: 0,
    }
  },
  mounted() {
    if(!this.type) {
      this.marks = ['饭钱', '交通', '购物', '人情', '其他']
      this.title = '输入支出金额'
    } else {
      this.marks = ['红包', '出售', '理财', '退款', '其他']
      this.title = '输入收入金额'
    }
  },
  methods: {
    clickConfirm() {
      this.$emit('confirm', {
        price: +this.price,
        mark: this.marks[this.currentIndex],
      })
      this.$emit('close')
    },
    clickMark(item, idx) {
      this.currentIndex = idx
    },
  }
}
</script>

<style scoped lang="less">
@import '~@/assets/css/target_bill/modal.less';

.input {
  .inputBorder();
  width: 440upx;
  height: 100upx;
  border: 4upx solid #FED6A4;
  border-radius: 20upx;
  margin-top: 32upx;
}

.marks {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 400upx;
  margin-top: 40upx;
  
  .mark {
    display: inline-block;
    width: 160upx;
    line-height: 64upx;
    border: 2upx solid #FED6A4;
    border-radius: 32upx;
    margin: 20upx 0;
    text-align: center;
    background: transparent;
    color: #333;
  }
  
  .selected {
    background-image: linear-gradient(-180deg, #FEF3AA 0%, #FFE888 100%);
    color: @mainTextColor;
  }
}

.click {
  .buttonHightlight();
  width: 420upx;
  height: 90upx;
  margin-top: 0;
}
</style>