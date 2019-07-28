<template>
  <view class="page">
    <view class="info">
      <view v-if="currentItem" class="current">
        <text>{{currentItem.highest}}</text>
        <view class="core">
          <image class="weather-icon" :src="`http://res.tianapi.com/weather/${currentItem.weatherimg}`" mode="aspectFit"></image>
          <text>{{currentItem.weather}}</text>
          <text>{{currentItem.date}}</text>
          <text>{{currentItem.wind}}：{{currentItem.windspeed}}</text>
        </view>
        <text>{{currentItem.lowest}}</text>
      </view>
    </view>
    <view class="time">
      <view class="list">
        <view class="item" :class="{highlight: currentIndex === idx}" v-for="(item, idx) of list" :key='idx' @click="clickTime(item, idx)"><image class="inner-icon" :src="`http://res.tianapi.com/weather/${item.weatherimg}`" mode="aspectFit"></image>{{item.week}}<text
            v-if="!idx" class="today">(今天)</text></view>
      </view>
    </view>
  </view>
</template>

<script>
  import singleMixin from '@/mixins/single'
  export default {
    mixins: [singleMixin],
    data() {
      return {
        list: [],
        currentIndex: 0,
      }
    },
    computed: {
      currentItem() {
        return this.list[this.currentIndex]
      }
    },
    onLoad(option) {
      uni.getLocation({
        success: async ({ longitude, latitude }) => {
          let res = await this.$http.tGet(this.$api.IP_QUERY, {
            longitude,
            latitude,
          })
          console.log(res)
        }
      })
      this.getList()
    },
    onShow() {},
    methods: {
      async getList() {
        this.showLoading('获取天气中...')
        let res = await this.$http.tGet(this.$api.TIAN_QI)
        uni.hideLoading()
        this.list = res
      },
      clickTime(item, idx) {
        this.currentIndex = idx
      }
    }
  }
</script>

<style scoped lang="less">
  .page {
    flex-direction: row;
    padding: 0;
  }

  @grey: #333;

  .info,
  .time {
    width: 50%;
    height: 100%;
    text-align: center;
  }

  .info {
    .current {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100%;
      font-size: 120upx;
      color: @grey;

      .core {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 40upx;
        color: @grey;
      }

      .weather-icon {
        @size: 160upx;
        width: @size;
        height: @size;
      }
    }
  }

  .time {
    background: @grey;

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 14vh;
      font-size: 40upx;
      color: white;
      
      .inner-icon {
        @size: 80upx;
        width: @size;
        height: @size;
      }

      .today {
        font-size: 24upx;
      }
    }

    .highlight {
      background: white;
      color: @grey;
      height: 16vh;
    }
  }
</style>
