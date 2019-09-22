<template>
  <view class="page">
    <view style='margin: 30upx 0 40upx;'>
      <searcher @input='inputSearch' @confirm='getList' :value='searchStr' :placeholder="placeholder"></searcher>
    </view>
    <template v-if="info.p0">
      <view class="time">
        更新时间：{{info.time}}
      </view>
      <view class="infos">
        <view class="info">
          <text class="number">92#</text>
          <text class="price">¥ {{info.p92}}<text class='sub'>元/升</text></text>
        </view>
        <view class="info">
          <text class="number">95#</text>
          <text class="price">¥ {{info.p95}}<text class='sub'>元/升</text></text>
        </view>
        <view class="info">
          <text class="number">98#</text>
          <text class="price">¥ {{info.p98}}<text class='sub'>元/升</text></text>
        </view>
        <view class="info">
          <text class="number">89#</text>
          <text class="price">¥ {{info.p89}}<text class='sub'>元/升</text></text>
        </view>
        <view class="info">
          <text class="number">0#</text>
          <text class="price">¥ {{info.p0}}<text class='sub'>元/升</text></text>
        </view>
      </view>
    </template>
    <view v-else class="time">
      获取中...
    </view>
  </view>
</template>

<script>
  import searchMixin from '@/mixins/search.js'
  import searcher from '@/components/searcher.vue'

  export default {
    mixins: [searchMixin],
    components: {
      searcher
    },
    data() {
      return {}
    },
    computed: {
      info() {
        let info = this.list[0] || {}
        info.time = this.$dayjs(info.time).format('MM月DD日  HH:mm')
        return info
      }
    },
    onLoad(option) {
      this.searchStr = this.$globalData.ipInfo.province
      this.getList()
    },
    methods: {
      async getList() {
        this.list = []
        let res = await this.$http.tGet(this.$api.OIL, {
          prov: this.searchStr,
        })
        this.list = res
      }
    }
  }
</script>

<style scoped lang="less">
  .page {
    background: url(http://file.kvker.com/9910f824d13371dc65a7/oil_bg.png) 0 0 ~'/'100% 100vh no-repeat;
  }

  .time {
    font-size: 24upx;
    font-family: PingFang-SC-Regular;
    text-align: center;
  }

  .infos {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 276upx;
      height: 230upx;
      margin: 32upx;
      font-size: 48upx;
      border-bottom: 2upx solid black;
      color: white;
      background: url(http://file.kvker.com/db516815067d33674d58/oil_sub_bg.png) 0 0 ~'/'276upx 230upx no-repeat;

      &:last-child {
        border-bottom: none;
      }

      .number {
        font-size: 28upx;
        line-height: 28upx;
        font-family: FZLTTHJW--GB1-0;
        margin: 20upx 0 70upx;
      }

      .price {
        font-size: 38upx;
        line-height: 38upx;
        font-family: HYXiaoBoZheZhiTiJ;
        color: black;
      }
    }
  }
</style>
