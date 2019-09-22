<template>
  <view class="page">
    <image class="bg" :src="imgBg" mode="aspectFill"></image>
    <view class="content">
      <view class="coins">
        <view class="row" v-for="(coin, idx) of coins" :key='idx'>
          <image class="coin-img" :src="coin.img" mode="aspectFit"></image>
          <input placeholder-style='color: rgba(255, 255, 255, .5);' type='number' v-model='coin.count' placeholder='数量'
            class="coin-count">
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
  import commonMixin from '@/mixins/common_page'
  let host = 'http://file.kvker.com'
  
  export default {
    mixins: [commonMixin],
    data() {
      return {
        coins: [{
            img: host + '/ea14f4cc58f03bb18673/100.jpg',
            count: '',
            priceF: 10000
          },
          {
            img: host + '/9a78271725382190023b/50.jpg',
            count: '',
            priceF: 5000
          },
          {
            img: host + '/2aab0cacb92777c711a9/20.jpg',
            count: '',
            priceF: 2000
          },
          {
            img: host + '/e6792f9553c120537eaa/10.jpg',
            count: '',
            priceF: 1000
          },
          {
            img: host + '/1a1b5acfee16e683b942/5.jpg',
            count: '',
            priceF: 500
          },
          {
            img: host + '/f9dc8ea8eb4456c393dc/1.jpg',
            count: '',
            priceF: 100
          },
          {
            img: host + '/2de519419ef3aa494141/1y.jpg',
            count: '',
            priceF: 100
          },
          {
            img: host + '/9834bfa1b487c9c56660/5j.jpg',
            count: '',
            priceF: 50
          },
          {
            img: host + '/b1e09d721ea954a54d9f/5m.jpg',
            count: '',
            priceF: 50
          },
          {
            img: host + '/0a777ca4097a24f10fcf/1j.jpg',
            count: '',
            priceF: 10
          },
          {
            img: host + '/d91569625283c638422e/1m.jpg',
            count: '',
            priceF: 10
          }
        ],
        imgBg: host + '/4a055b5859763dce1cc1/bg.jpg',
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
