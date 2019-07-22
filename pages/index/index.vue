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

  let utils = []
  homepageUtils.forEach(item => {
    item.subs.forEach(subItem => {
      let util = {
        path: item.path,
      }
      util.label = subItem.label
      util.path += `?title=${subItem.label}&url=${subItem.url}&key=${subItem.key}&keys=${JSON.stringify(subItem.keys || '[]')}&values=${JSON.stringify(subItem.values || '[]')}`
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
    methods: {
    },
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
      width: 200upx;
      height: 120upx;
      border: 2upx dashed #666;
      border-radius: 16upx;
      margin-bottom: 16px;
    }

    .util-hover {
      border: 2upx solid #666;
    }
  }
</style>
