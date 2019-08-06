<template>
  <view class="page">
    <view class="total">
      <view class="target">
        离
        <text class="underline">{{main.target}}</text>
        还差
        <text class="underline">{{lastDays}}</text>
        天
      </view>
      <view class="spend">
        <text>还差</text>
        <text class="normal">{{totalAway}}</text>
        <text>元</text>
      </view>
      <view class="markDays">
        <text>记账第</text>
        <text class="normal">{{totalDays}}</text>
        <text>天</text>
      </view>
    </view>
    <view class="mark">
      <view class='btn' @click='spendShow = true'>支出 - 远离小目标</view>
      <view class="money">
        <text>共消费</text>
        <text class='normal'>{{totalSpend}}</text>
        <text>元</text>
      </view>
    </view>
    <view class="mark">
      <view class='btn' @click='incomeShow = true'>收入 - 靠近小目标</view>
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
          // 小目标
          target: '',
          // 预算
          budget: 0,
          // 月收入
          income: 0,
          // 收入列表
          listSpend: [],
          // 支出列表
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
        return this.main.budget + this.totalSpend - this.totalIncome - (this.dayIncome * (this.totalDays - 1)) || ''
      },
      // 记账第几天
      totalDays() {
        return this.$dayjs().diff(this.$dayjs(this.main.createdAt), 'day') + 1
      },
      // 共消费
      totalSpend() {
        return this.main.listSpend.reduce((pre, cur) => pre + cur.price, 0) || 0
      },
      // 共收入
      totalIncome() {
        return this.main.listIncome.reduce((pre, cur) => pre + cur.price, 0) || 0
      },
      // 还差多少天
      lastDays() {
        return this.totalAway / this.dayIncome || 0
      },
    },
    onShow() {
      this.main = uni.getStorageSync('main') || {
        budget: 0,
        income: 0,
        listSpend: [],
        listIncome: [],
      }
    },
    onLoad(option) {
      uni.showShareMenu({
        withShareTicket: false
      })
      uni.setNavigationBarTitle({
        title: '小目标账单',
      })
      this.getTarget()
    },
    methods: {
      async getTarget() {
        let res = await this.$http.avRetrieve(this.$classs.LITTLE_TARGET, query => {
          query.equalTo('user', this.$globalData.sourceUser)
        })
        if (res.length) {
          this.main = res[0]
          this.checkCompleted()
        }
      },
      // 检查是否完成
      checkCompleted() {
        this.completedShow = this.lastDays < 1
      },
      async clickConfirm(type, item) {
        switch (type) {
          case 0: {
            let res = await this.$http.avArrayCtrl(this.$classs.LITTLE_TARGET, this.main.objectId, {
              key: 'listSpend', 
              item,
            })
            if (res) {
              this.main.listSpend.push(item)
            }
          }
            break;
          case 1: {
            let res = await this.$http.avArrayCtrl(this.$classs.LITTLE_TARGET, this.main.objectId, {
              key :'listIncome',
              item,
            })
            if (res) {
              this.main.listIncome.push(item)
            }
          }
            break;
          default:
            ;
        }
        this.checkCompleted()
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
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 120rpx;

    .btn {
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
