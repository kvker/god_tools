<template>
  <view class="page">
    <view id="mask" @click="clickSearchMask" :class="searcherShow ? 'searcher-box searcher-box-show' : 'searcher-box'">
      <searcher @click.stop class='searcher' placeholder='搜索地区' :value='searchStr' @confirm='search' @input='inputSearch'></searcher>
    </view>
    <view class="mask-box" @click='searcherShow = true'>
      <view class='background'>
        <mask-label></mask-label>
      </view>
      <image class="thunder" v-if="list.length" :src="img[list[0].weatherimg]" mode="aspectFit"></image>
      <text>{{showStr}}</text>
      <image class="local" :src="img.local" mode="aspectFit"></image>
    </view>
    <view class="infos">
      <view class="info" v-for="(item, idx) of list" :key='idx'>
        <image class="weather-icon" :src="img[item.weatherimg]" mode="aspectFit"></image>
        <text>{{item.weather}}</text>
        <view class="temp">
          <text>{{item.lowest}}</text>
          ~
          <text>{{item.highest}}</text>
        </view>
        <view v-if="!idx" class="dates">
          <text>{{item.week}}</text>
          <text>{{item.showDate}}</text>
        </view>
        <view v-else class="dates">
          <text>{{item.showDate}}({{item.week}})</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import commonMixin from '@/mixins/common_page'
  import searchMixin from '@/mixins/search'
  import searcher from '@/components/searcher.vue'
  import maskLabel from '@/components/mask_label.vue'

  export default {
    mixins: [commonMixin, searchMixin],
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
        searcherShow: false,
      }
    },
    onLoad(option) {
      this.searchStr = this.$globalData.ipInfo.city
      this.getList()
    },
    methods: {
      async getList() {
        this.showLoading('获取天气中...')
        this.list = []
        let res = await this.$http.tGet(this.$api.TIAN_QI, {
          city: this.searchStr,
        })
        uni.hideLoading()
        this.list = res.map(i => ({
          ...i,
          showDate: this.$dayjs(i.date).format("MM-DD")
        }))
        this.showStr = this.searchStr
        this.searchStr = ''
      },
      clickTime(item, idx) {
        this.currentIndex = idx
      },
      search() {
        this.searcherShow = false
        this.showStr = this.searchStr
        this.getList()
      },
      clickSearchMask(e) {
        if(e.target.id === e.currentTarget.id) {
          this.searcherShow = false
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .page {
    align-items: center;
    z-index: 100;
    background: #E3F5FF;
  }

  @grey: #333;

  .searcher-box {
    position: fixed;
    top: -100vh;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, .1);
    z-index: 11;
  }

  .searcher-box-show {
    transform: translateY(100vh);
  }

  .mask-box {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200upx;
    height: 46upx;
    margin: 30upx 0;

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
    justify-content: space-evenly;
    flex-wrap: wrap;
    flex: 1;
    width: 100%;

    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      width: 210upx;
      height: 280upx;
      background: white;
      border: 4upx solid black;
      border-radius: 6upx;
      font-size: 24upx;
      font-family: PingFangSC-Regular;

      &:first-child {
        width: 690upx;
        height: 346upx;
        background: #FFEB09;
      }

      .weather-icon {
        @size: 80upx;
        width: @size;
        height: @size;
      }

      .temp {
        font-size: 32upx;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
      }

      .dates {
        display: flex;
        justify-content: space-around;
        width: 100%;
        font-size: 24upx;
      }
    }
  }
</style>
