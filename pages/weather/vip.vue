<template>
  <view class="weather-vip">
    <searcher placeholder='搜索地区' :value='searchStr' @confirm='search' @input='inputSearch'></searcher>
    {{result}}
  </view>
</template>

<script>
  import singleMixin from '@/mixins/single'
  import searchMixin from '@/mixins/search'
  import searcher from '@/components/searcher.vue'

  export default {
    data() {
      return {

      }
    },
    mixins: [singleMixin, searchMixin],
    components: {
      searcher,
    },
    onLoad(option) {

    },
    methods: {
      async getResult() {
        this.list = []
        this.showLoading('获取天气中...')
        let res = await this.$http.jGet(this.$api.J_TIAN_QI, {
          city: this.searchStr,
        })
        uni.hideLoading()
        this.result = res
      },
      clickTime(item, idx) {
        this.currentIndex = idx
      },
      search() {
        this.getResult()
      },
    }
  }
</script>

<style>
</style>
