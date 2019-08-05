<template>
  <view class="page">
    <image class="title-img" src="https://lc-vdtaziqw.cn-e1.lcfile.com/92998e6c3e64e311e569/target_bill_create_title.png"></image>
    <input-dream title='输入你的小目标' placeholder='请输入小目标' remind='注:如去日本' type='number' @input='inputCard(0, $event)'></input-dream>
    <input-dream title='小目标的预算' placeholder='请输入预算' remind='注：如5000' type='number' @input='inputCard(1, $event)'></input-dream>
    <input-dream title='月实际收入' placeholder='请输入月收入' remind='注：如5000' type='number' @input='inputCard(2, $event)'></input-dream>
    <view class="btn click" @click="goIndex">开始实现小目标</view>
  </view>
</template>

<script>
  import inputDream from '@/components/target_bill/input_dream'

  export default {
    components: {
      inputDream
    },
    data() {
      return {
        target: '',
        budget: '',
        income: 0,
      }
    },
    onLoad(option) {
      wx.showShareMenu({
        withShareTicket: false
      })
    },
    methods: {
      async goIndex() {
        if (this.dataError()) return

        let target = {
          target: this.target,
          budget: +this.budget,
          income: +this.income,
          listSpend: [],
          listIncome: [],
          user: this.$globalData.sourceUser,
        }
        let res = await this.$http.avCreate(this.$classs.LITTLE_TARGET, target)
        console.log(res)
        if(res) {
          uni.navigateBack({
            delta: 1
          })
        }
      },
      dataError() {
        let error
        if (!this.target) {
          error = '请输入目标'
        } else if (!this.budget) {
          error = '请输入预算'
        } else if (!this.income) {
          error = '请输入月收入'
        } else if (!(this.income / 30)) {
          error = '月收入不正确，请至少大于30吧'
        }

        wx.showToast({
          title: error || '请前往你的小目标吧',
          icon: 'none',
          duration: 2000,
        })
        return error
      },
      inputCard(type, e) {
        let value = e.target.value
        switch (type) {
          case 0:
            this.target = value
            break
          case 1:
            this.budget = parseInt(value)
            break
          case 2:
            this.income = parseInt(value)
            break
        }
      },
    },
    onShareAppMessage() {
      return {
        title: '一步一步，助你实现小目标！',
      }
    },
  }
</script>

<style scoped lang='less'>
  @import '~@/assets/css/target_bill/main.less';

  .page {
    align-items: center;
    justify-content: space-around;
    padding: 100upx 16upx;

    .title-img {
      width: 580upx;
      height: 110upx;
    }

    .click {
      .buttonHightlight();
    }
  }
</style>
