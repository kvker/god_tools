<template>
  <view>
    <searcher @input='inputSearch' @confirm='getList' :value='searchStr'></searcher>
    <template v-if="info.p0">
      <view class="oil-info">
        {{info.time}}
      </view>
      <view class="oil-info">
        <text class="oil-number">0#</text>
        <text class="oil-price">{{info.p0}}元</text>
      </view>
      <view class="oil-info">
        <text class="oil-number">89#</text>
        <text class="oil-price">{{info.p89}}元</text>
      </view>
      <view class="oil-info">
        <text class="oil-number">92#</text>
        <text class="oil-price">{{info.p92}}元</text>
      </view>
      <view class="oil-info">
        <text class="oil-number">95#</text>
        <text class="oil-price">{{info.p95}}元</text>
      </view>
      <view class="oil-info">
        <text class="oil-number">98#</text>
        <text class="oil-price">{{info.p98}}元</text>
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
        info.time = this.$dayjs(info.time).format('MM-DD HH:mm')
        return info
      }
    },
    onLoad(option) {
      this.searchStr = '北京'
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

    .oil-number {}

    .oil-price {}
  }
</style>
