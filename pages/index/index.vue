<template>
  <view class="page">
    <money></money>
    <view class="utils">
      <navigator class="util" hover-class="util-hover" v-for="(item, idx) in utils" :key='idx' :url="item.path">{{item.label}}</navigator>
    </view>
    <button class="contact" open-type="contact">问</button>
  </view>
</template>

<script>
  import money from '@/components/homepage/money'
  import homepageUtils from '@/assets/js/homepage_utils.js'

  const params = [{
    key: 'label'
  }, {
    key: 'hasPage'
  }, {
    key: 'url'
  }, {
    key: 'key'
  }, {
    key: 'keys',
    isJSON: true
  }, {
    key: 'values',
    isJSON: true
  }, {
    key: 'canRandom', // 是否可以随机，用于搜索
  }, ]

  let utils = []
  homepageUtils.forEach(item => {
    item.subs.forEach(subItem => {
      let util = {
        path: item.path,
      }
      util.label = subItem.label
      util.path += '?'
      params.forEach(({
        key,
        isJSON
      }) => {
        util.path += `${key}=${(isJSON && subItem[key]) ? JSON.stringify(subItem[key]) : (subItem[key] || '')}&`
      })
      utils.push(util)
    })
  })

  export default {
    components: {
      money,
    },
    data() {
      return {
        utils,
      }
    },
    methods: {},
  }
</script>

<style scoped lang='less'>
  .page {
    flex-direction: column;
  }

  .utils {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: center;

    .util {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 160upx;
      height: 80upx;
      border: 2upx dashed #666;
      border-radius: 16upx;
      margin-bottom: 16px;
    }

    .util-hover {
      border: 2upx solid #666;
    }
  }
</style>
