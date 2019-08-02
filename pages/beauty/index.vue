<template>
  <view class="beauty">
    <searcher @input='inputSearch' @confirm='search' @clean='clean' :value='searchStr' :placeholder="placeholder"></searcher>
  </view>
</template>

<script>
  import searchMixin from '@/mixins/search'
  import searcher from '@/components/searcher.vue'

  export default {
    mixins: [searchMixin],
    components: {
      searcher,
    },
  }
</script>

<style>
</style>
