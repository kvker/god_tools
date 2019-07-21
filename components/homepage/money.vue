<template>
  <view class="money-box">
    <view class="buttons">
      <view class="button" :class="{highlight: currentIdx === idx}" v-for="(moneyGroup, idx) of moneyGroups" :key="`nb${idx}`"
        @click="clickButton(idx)">{{moneyGroup.label}}</view>
    </view>
    <view class="money-group">
      <view class="money" v-for="(money, nidx) of moneyGroup.list" :key="`ng${nidx}`">
        <view class="desc">单位：<text class='result'>美元</text></view>
        <view class="desc cur">收盘价：<text class='result'>{{money.close}}</text></view>
        <view class="desc high">日最高价：<text class='result'>{{money.high}}</text></view>
        <view class="desc low">日最低价：<text class='result'>{{money.low}}</text></view>
        <view class="desc">成交笔数：<text class='result'>{{money.count}}</text></view>
        <view class="desc">记录时间：<text class='result'>{{money.time.replace(/:\d+?\.\d+$/, '')}}</text></view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        currentIdx: 0,
        // 存放下载货币的容器，套数组
        moneyGroups: [],
        // 请求的顺序函数，用来刷新
        funcs: [],
      }
    },
    computed: {
      moneyGroup() {
        return this.moneyGroups[this.currentIdx] || {
          list: []
        }
      },
    },
    mounted() {
      if (!this.$isPro) {
        this.getBTC()
        this.getETH()
      }
    },
    methods: {
      clickButton(idx) {
        if (this.currentIdx === idx) {
          this.updateMoney(idx)
        } else {
          this.currentIdx = idx
        }
      },
      copyLink(idx) {
        let item = this.moneyGroup.list[idx]
        uni.setClipboardData({
          data: item.url.replace(/\&amp;/g, '&'),
        })
      },
      /** 
       * 请求货币的统一函数，基准函数
       * @param {String} path 请求地址
       * @param {Object} params 请求参数
       * @param {String} label 显示的title
       * @param {Function} func 刷新调用的具体函数
       * @param {Number} idx 传入idx则为刷新
       */
      getMoney(path, params, label, func, idx) {
        let isFresh = typeof(idx) === 'number'
        let item = {
          list: [],
          label,
        }
        if (isFresh) {
          this.$set(this.moneyGroups, idx, item)
        }
        this.$http.tGet(path, params, res => {
          if (res) {
            item.list = res
            if (isFresh) {
              this.$set(this.moneyGroups, idx, item)
            } else {
              this.funcs.push(func)
              this.moneyGroups.push(item)
            }
          }
        })
      },
      /**
       * 获取比特币
       * @param {Number} idx 如果有idx则为刷新，首次调用不传的
       */
      getBTC(idx) {
        this.getMoney(this.$api.CYBER_MONEY, {
          coin: 'btcusdt'
        }, '比特币', this.getBTC, idx)
      },
      /**
       * 获取以太坊
       * @param {Number} idx 如果有idx则为刷新，首次调用不传的
       */
      getETH(idx) {
        this.getMoney(this.$api.CYBER_MONEY, {
          coin: 'ethusdt'
        }, '以太坊', this.getETH, idx)
      },
      /**
       * 根据点击索引刷新内容
       * @param {Number} idx 点击的按钮索引
       */
      updateMoney(idx) {
        this.funcs[idx](idx)
      },
    },
  }
</script>

<style scoped lang="less">
  .money-box {
    height: 400upx;
  }

  .buttons {
    width: 100%;
    display: flex;

    .button {
      flex: 1;
    }
  }

  .money-group {
    height: calc(100% - 72upx);

    .money {
      width: 100%;
      min-height: 100upx;
      padding: 0 16upx;
      margin: 16upx 0 0;

      .desc {
        display: flex;
        justify-content: space-between;
        line-height: 48upx;
      }
      
      .cur {
        font-size: 36upx;
        line-height: 64upx;
      }
      
      .high {
        color: red;
      }
      
      .low {
        color: green;
      }
      
      .result {
        width: 50%;
      }

      .button {
        margin-left: 8upx;
      }
    }
  }
</style>
