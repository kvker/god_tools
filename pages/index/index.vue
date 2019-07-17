<template>
  <view class="page">
    <news class='news'></news>
    <view class="utils">
      <view class="util" v-for="(item, idx) in utils" :key='`${idx}rc`' @click="clickUtil(idx)">垃圾分类</view>
    </view>
  </view>
</template>

<script>
  import news from '@/components/homepage/news'
  
  // uni.request({
  //   url: 'http://api.tianapi.com/wxnew?key=4641dbc0816d3ac895f65462c1d967fd&num=10',
  //   success(res) {
  //     console.log(res.data.newslist)
  //   }
  // })

  export default {
    components: {
      news,
    },
    data() {
      return {
        utils: [{ label: '垃圾分类', path: '/pages/rubbish_categary/index' }, { label: '垃圾分类', path: '/pages/rubbish_categary/index' },
          { label: '垃圾分类', path: '/pages/rubbish_categary/index' }, { label: '垃圾分类', path: '/pages/rubbish_categary/index' },
          { label: '垃圾分类', path: '/pages/rubbish_categary/index' }, { label: '垃圾分类', path: '/pages/rubbish_categary/index' },
          { label: '垃圾分类', path: '/pages/rubbish_categary/index' }, { label: '垃圾分类', path: '/pages/rubbish_categary/index' },
          { label: '垃圾分类', path: '/pages/rubbish_categary/index' }
        ],
      }
    },
    methods: {
      clickUtil(idx) {
        let util = this.utils[idx]
        uni.navigateTo({
          url: util.path,
        });
      },
    }
  }
</script>

<style scoped lang='less'>
  .page {
    justify-content: space-between;
  }

  .news {
    flex: 1;
  }

  .utils {
    height: 62%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: space-between;

    .util {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200upx;
      height: 200upx;
    }
  }
</style>
