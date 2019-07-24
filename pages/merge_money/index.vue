<template>
  <view class="page">
    <image class="bg" :src="imgBg" mode="aspectFill"></image>
    <view class="content">
      <view class="coins">
        <view class="row" v-for="(coin, idx) of coins" :key='idx'>
          <image class="coin-img" :src="coin.img" mode="aspectFit"></image>
          <input placeholder-style='color: rgba(255, 255, 255, .5);' type='number' v-model='coin.count' placeholder='数量' class="coin-count">
        </view>
      </view>
      <view class="result">
        <button class="reset" @click="clickReset">重置</button>
        <text>总金额</text>
        <input type="number" class="result-count" readonly :value='result'>
        <text style="color: white;">元</text>
      </view>
    </view>
  </view>
</template>

<script>
  import img1 from '@/assets/img/1.jpg'
  import img1j from '@/assets/img/1j.jpg'
  import img1m from '@/assets/img/1m.jpg'
  import img1y from '@/assets/img/1y.jpg'
  import img5 from '@/assets/img/5.jpg'
  import img5j from '@/assets/img/5j.jpg'
  import img5m from '@/assets/img/5m.jpg'
  import img10 from '@/assets/img/10.jpg'
  import img20 from '@/assets/img/20.jpg'
  import img50 from '@/assets/img/50.jpg'
  import img100 from '@/assets/img/100.jpg'
  import imgBg from '@/assets/img/bg.jpg'

  export default {
    data() {
      return {
        coins: [{
            img: img100,
            count: '',
            priceF: 10000
          },
          {
            img: img50,
            count: '',
            priceF: 5000
          },
          {
            img: img20,
            count: '',
            priceF: 2000
          },
          {
            img: img10,
            count: '',
            priceF: 1000
          },
          {
            img: img5,
            count: '',
            priceF: 500
          },
          {
            img: img1,
            count: '',
            priceF: 100
          },
          {
            img: img1y,
            count: '',
            priceF: 100
          },
          {
            img: img5j,
            count: '',
            priceF: 50
          },
          {
            img: img5m,
            count: '',
            priceF: 50
          },
          {
            img: img1j,
            count: '',
            priceF: 10
          },
          {
            img: img1m,
            count: '',
            priceF: 10
          }
        ],
        imgBg,
      }
    },
    computed: {
      /**
       * 最终多少钱
       */
      result() {
        let result = this.coins.reduce((pre, cur) => {
          return pre + cur.priceF * (cur.count || 0)
        }, 0)
        return result / 100
      }
    },
    onLoad() {
      wx.showShareMenu({
        withShareTicket: false
      })
    },
    methods: {
      clickReset() {
        wx.showModal({
          title: '提示',
          content: '即将重置所有数量,确定吗？',
          success: res => {
            if (res.confirm) {
              for (let coin of this.coins) {
                coin.count = ''
              }
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .count {
    height: 84rpx;
    border: 2rpx solid #FFFFFF;
    border-radius: 10rpx;
    text-align: center;
  }

  .page {
    font-size: 36rpx;
    padding: 0;

    .bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }


    .content {
      width: 100%;
      height: 100%;
      z-index: 1;
      background: rgba(171, 171, 171, .35);

      .coins {
        height: 90%;
        overflow-y: auto;

        .row {
          position: relative;
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: 24rpx;

          .coin-img {
            width: 248rpx;
            height: 110rpx;
          }

          .coin-count {
            .count;
            width: 204rpx;
            color: #fff;
          }
        }
      }

      .result {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 10%;

        .reset {
          width: 60rpx;
          height: 60rpx;
          margin: 0 40rpx 0 0;
          padding: 0;
          border: 2rpx solid red;
          border-radius: 30rpx;
          background: transparent;
          font-size: 24rpx;
          color: #fff;
        }

        &:after {
          border: 0;
        }

        span {
          color: #fff;
        }

        .result-count {
          .count;
          width: 360rpx;
          margin: 0 40rpx;
          background: #fff;
        }
      }
    }
  }
</style>
