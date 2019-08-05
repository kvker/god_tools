<template>
  <view class="completed model">
    <view class="content">
      <text class="title">~梦想实现~</text>
      <view class="congratulation">
        <text>恭喜！</text>
        <text class="middle">
          在记账
          <text class="total-days">{{totalDays}}</text>
          天内存到了梦想
        </text>
        <text>基金！</text>
      </view>
      <view class="btn check" @click="clickCheck">查看成就</view>
      <view class="btn again" @click="clickAgain">再许个愿</view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      totalDays: {
        type: Number,
      },
    },
    methods: {
      clickCheck() {
        this.$emit('clickCheck')
      },

      clickAgain() {
        uni.removeStorage({
          key: this.$storageKeys.GENERATE_TARGET_DAY,
          success: () => {
            uni.navigateTo({
              url: '/pages/target_bill/create',
            })
          }
        })
      },
    }
  }
</script>

<style scoped lang='less'>
  @import '~@/assets/css/target_bill/modal';

  .congratulation {
    display: flex;
    flex-direction: column;
    margin: 60rpx 0 60rpx 0;

    span {
      color: @mainTextColor;
    }

    .middle {
      argin-top: 60rpx;

      .total-days {
        margin: 0 10rpx;
      }
    }
  }

  .button {
    .buttonHightlight();
    width: 420rpx;
    height: 90rpx;
  }

  .check {
    .button();
    background-image: linear-gradient(-180deg, #FECBAA 0%, #F7975D 100%);
    color: white;
  }

  .again {
    .button();
  }
</style>
