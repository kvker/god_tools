<template>
  <view>
    <searcher @input='inputSearch' @confirm='getList' :value='searchStr' :placeholder="placeholder"></searcher>
    <template v-if="info.p0">
      <view class="oil-info">
        更新时间  {{info.time}}
      </view>
      <view class="oil-info">
        <text class="oil-number">0#</text>
        <text class="oil-type">柴油</text>
        <text class="oil-price">{{info.p0}}(元/升)</text>
      </view>
      <view class="oil-info">
        <text class="oil-number">92#</text>
        <text class="oil-type">汽油</text>
        <text class="oil-price">{{info.p92}}(元/升)</text>
      </view>
      <view class="oil-info">
        <text class="oil-number">95#</text>
        <text class="oil-type">汽油</text>
        <text class="oil-price">{{info.p95}}(元/升)</text>
      </view>
      <view class="oil-info">
        <text class="oil-number">98#</text>
        <text class="oil-type">汽油</text>
        <text class="oil-price">{{info.p98}}(元/升)</text>
      </view>
    </template>
    <view v-else class="oil-info">
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
        info.time = this.$dayjs(info.time).format('HH:mm')
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
  .oil-info {
    display: flex;
    justify-content: space-around;
    width: 100%;
    line-height: 160upx;
    font-size: 48upx;
    border-bottom: 2upx solid black;
    
    &:last-child {
      border-bottom: none;
    }

    text {
      display: block;
      width: 200upx;
      font-size: 40upx;
    }

    .oil-number {
      color: red;
    }
    .oil-type {
      color: green;
      font-size: 32upx;
    }
    .oil-price {
      text-align: right;
      font-size: 28upx;
    }
  }
</style>
