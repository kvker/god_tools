<template>
  <view class="page">
    <view class="total">
      <text class="target">
        离
        <text class="underline">{{main.target}}</text>
        还差
        <text class="underline">{{lastDays}}</text>
        天
      </text>
      <view class="spend">
        <text>还差</text>
        <text class="normal">{{totalAway}}</text>
        <text>元</text>
      </view>
      <view class="markDays">
        <text>共记账</text>
        <text class="normal">{{totalDays}}</text>
        <text>天</text>
      </view>
      <view class="mark">
        <button @click='spendShow = true'>支出--远离小目标</button>
        <view class="money">
          <text>共消费</text>
          <text class='normal'>{{totalSpend}}</text>
          <text>元</text>
        </view>
      </view>
    </view>
    <view class="mark">
      <button @click='incomeShow = true'>收入--靠近小目标</button>
      <view class="money">
        <text>小目标基金达</text>
        <text class="normal">{{totalIncome}}</text>
        <text>元</text>
      </view>
    </view>
    <button class="cancel" @click='clickCancel'>放弃小目标</button>
    <confirm v-if='spendShow' title='输入支出金额' :type='0' @close='spendShow = false' @confirm='clickConfirm(0, $event)'></confirm>
    <confirm v-if='incomeShow' title='输入收入金额' :type='1' @close='incomeShow = false' @confirm='clickConfirm(1, $event)'></confirm>
    <completed v-if='completedShow' :totalDays='totalDays' @clickCheck='clickCheck'></completed>
    <share v-if='shareShow' :totalDays="totalDays" :main="main" @close='clickShareClose'></share>
  </view>
</template>

<script>
  import confirm from '@/components/target_bill/confirm'
  import completed from '@/components/target_bill/completed'
  import share from '@/components/target_bill/share'

  export default {
    components: {
      confirm,
      completed,
      share,
    },
    data() {
      return {
        main: {
          listSpend: [],
          listIncome: [],
        },
        spendShow: false,
        incomeShow: false,
        completedShow: false, // 愿望完成
        shareShow: false, // 显示分享
      }
    },
    computed: {
      // 每日收入
      dayIncome() {
        return this.main.income / 30
      },
      // 还差多少元
      totalAway() {
        return this.main.budget + this.totalSpend - this.totalIncome - (this.dayIncome * this.totalDays) || ''
      },
      // 共记账多少天
      totalDays() {
        return new Date().getTime() / 1000 / (24 * 3600) - this.main.initialTimestampDay + 1 || ''
      },
      // 共消费
      totalSpend() {
        return this.main.listSpend.reduce((pre, cur) => util.yuan2yuan(pre + cur.price), 0) || 0
      },
      // 共收入
      totalIncome() {
        return this.main.listIncome.reduce((pre, cur) => util.yuan2yuan(pre + cur.price), 0) || 0
      },
      // 还差多少天
      lastDays() {
        return this.totalAway / this.dayIncome || 0
      },
    },
    onShow() {
      this.main = uni.getStorageSync('main') || {
        listSpend: [],
        listIncome: [],
      }
    },
    onReady() {
      if (!this.main.target) {
        uni.redirectTo({
          url: '/pages/regist/main',
        })
      }
    },
    onLoad() {
      this.checkCompleted()
      uni.showShareMenu({
        withShareTicket: false
      })
    },
    methods: {
      // 检查是否完成
      checkCompleted() {
        this.completedShow = this.lastDays < 1
      },
      clickConfirm(type, payload) {
        switch (type) {
          case 0:
            this.main.listSpend.push(payload)
            break;
          case 1:
            this.main.listIncome.push(payload)
            break;
          default:
            ;
        }
        this.checkCompleted()
        uni.setStorage({
          key: 'main',
          data: this.main,
          success: () => {
            uni.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 300,
              fail: error => {
                uni.uni.showToast({
                  title: error,
                  icon: 'none',
                  duration: 2000,
                })
              }
            })
          }
        })
      },
      // 点击前往查看
      clickCheck() {
        this.shareShow = true
      },
      // 点击分享后的关闭功能
      clickShareClose() {
        this.shareShow = false
        this.completedShow = false
      },
    },
    onShareAppMessage() {
      return {
        title: '一步一步，助你实现小目标！',
      }
    },
  }
</script>

<style scoped lang="less">
  @import '~@/assets/css/target_bill/main.less';

  .moneyMixin() {
    display: flex;
    justify-content: space-between;
    width: 480rpx;
    font-size: 40rpx;
    color: @mainTextColor;

    .normal {
      color: #756766;
    }
  }

  .total {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 33%;
    background-image: linear-gradient(-180deg, #FEF3AA 0%, #FFE888 100%);

    .target {
      font-size: 48rpx;
      color: @mainTextColor;
      text-align: center;
    }

    .underline {
      color: #756766;
      border-bottom: 6rpx solid @mainTextColor;
      margin: 0 40rpx 0 20rpx;
    }

    .spend,
    .markDays {
      .moneyMixin();
    }
  }

  .mark {
    margin-top: 120rpx;

    button {
      .buttonHightlight();
    }

    .money {
      .moneyMixin();
      width: 320rpx;
      margin: 20rpx 0 0 160rpx;
      font-size: 36rpx;
      color: @mainTextColor;
    }
  }


  @cancelRB: 20rpx;

  .cancel {
    position: absolute;
    right: @cancelRB;
    bottom: @cancelRB;
    padding: 0;
    line-height: normal;
    border-radius: 0;
    font-size: 24rpx;
    color: red;
    background: transparent;
  }
</style>
