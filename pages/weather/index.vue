<template>
  <view class="page">
    <searcher class='searcher' placeholder='搜索地区' :value='searchStr' @confirm='search' @input='inputSearch'></searcher>
    <view class="mask-box">
      <mask-label class='background'></mask-label>
      <image class="thunder" :src="img.thunder" mode="aspectFit"></image>
      <text>{{showStr}}</text>
      <image class="local" :src="img.local" mode="aspectFit"></image>
    </view>
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
  import maskLabel from '@/components/mask_label.vue'

  export default {
    mixins: [singleMixin, searchMixin],
    components: {
      searcher,
      maskLabel,
    },
    data() {
      return {
        list: [],
        currentIndex: 0,
        // 显示在mask上的问题
        showStr: '',
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
        this.showStr = this.searchStr
        this.searchStr = ''
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
  .page {
    align-items: center;
    background: #E3F5FF;
  }

  @grey: #333;
  
  // .searcher {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   z-index: 11;
  // }

  .mask-box {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200upx;
    height: 46upx;
    margin: 8upx 0;

    .background {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }

    .thunder {
      width: 40upx;
      height: 54upx;
    }

    .local {
      width: 44upx;
      height: 30upx;
    }
  }

  .infos {
    display: flex;
    flex: 1;
    width: 100%;
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
