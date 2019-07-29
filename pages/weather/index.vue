<template>
  <view class="page">
    <searcher placeholder='搜索地区' :value='searchStr' @confirm='search' @input='inputSearch'></searcher>
    <view class="infos">
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
          <view class="item" :class="{highlight: currentIndex === idx}" v-for="(item, idx) of list" :key='idx' @click="clickTime(item, idx)">
            <image class="inner-icon" :src="`http://res.tianapi.com/weather/${item.weatherimg}`" mode="aspectFit"></image>{{item.week}}<text
              v-if="!idx" class="today">(今天)</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import singleMixin from '@/mixins/single'
  import searchMixin from '@/mixins/search'
  import searcher from '@/components/searcher.vue'

  export default {
    mixins: [singleMixin, searchMixin],
    components: {
      searcher,
    },
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
      this.getAddress()
    },
    methods: {
      async getAddress() {
        this.showLoading('获取天气中...')
        let res = await this.$http.kGet('/api/ip')
        res = await this.$http.tGet(this.$api.IP_QUERY, { ip: res.ip })
        this.searchStr = res[0].city
        this.getList()
      },
      async getList() {
        this.showLoading('获取天气中...')
        this.list = []
        let res = await this.$http.tGet(this.$api.TIAN_QI, {
          city: this.searchStr,
        })
        uni.hideLoading()
        this.list = res
      },
      clickTime(item, idx) {
        this.currentIndex = idx
      },
      search() {
        this.getList()
      },
    }
  }
</script>

<style scoped lang="less">
  .page {}

  @grey: #333;

  .infos {
    display: flex;
    flex: 1;
  }

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

    .list {
      height: 100%;
    }

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 14%;
      font-size: 40upx;
      color: white;

      .inner-icon {
        @size: 64upx;
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
      height: 16%;
    }
  }
</style>
