<template>
  <view class="page">
    <searcher style='margin: 30upx 0 40upx;' @input='inputSearch' @confirm='getList' :value='searchStr' :placeholder="placeholder"></searcher>
    <template v-if="info.time">
      <view class="time">
        更新时间：{{info.time}}
      </view>
      <view class="infos">
        <view class="info">
          <text class="number">92#</text>
          <text class="price">{{info.p92}}元/升</text>
        </view>
        <view class="info">
          <text class="number">95#</text>
          <text class="price">{{info.p95}}元/升</text>
        </view>
        <view class="info">
          <text class="number">98#</text>
          <text class="price">{{info.p98}}元/升</text>
        </view>
        <view class="info">
          <text class="number">89#</text>
          <text class="price">{{info.p89}}元/升</text>
        </view>
        <view class="info">
          <text class="number">0#</text>
          <text class="price">{{info.p0}}元/升</text>
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
      this.getAddress()
    },
    methods: {
      async getAddress() {
        let res = await this.$http.kGet('/api/ip')
        res = await this.$http.tGet(this.$api.IP_QUERY, { ip: res.ip })
        this.searchStr = res[0].province
        this.getList()
      },
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
    background: url(https://lc-vdtaziqw.cn-e1.lcfile.com/9910f824d13371dc65a7/oil_bg.png) 0 0 ~'/'100% 100vh no-repeat;
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
      background: url(https://lc-vdtaziqw.cn-e1.lcfile.com/db516815067d33674d58/oil_sub_bg.png) 0 0 ~'/'276upx 230upx no-repeat;

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
