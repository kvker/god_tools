<template>
  <view class="page">
    <news class='news' :newsGroups="newsGroups"></news>
    <view class="utils">
      <navigator class="util" hover-class="util-hover" v-for="(item, idx) in utils" :key='`${idx}rc`' :url="item.path">垃圾分类</navigator>
    </view>
  </view>
</template>

<script>
  import news from '@/components/homepage/news'

  export default {
    components: {
      news,
    },
    data() {
      return {
        utils: [{ label: '垃圾分类', path: '/pages/rubbish_categary/index' }, { label: '垃圾分类', path: '/pages/rubbish_categary/index' },
          { label: '垃圾分类', path: '/pages/rubbish_categary/index' }, { label: '垃圾分类', path: '/pages/rubbish_categary/index' },
          { label: '垃圾分类', path: '/pages/rubbish_categary/index' }, { label: '垃圾分类', path: '/pages/rubbish_categary/index' },
          { label: '垃圾分类', path: '/pages/rubbish_categary/index' }, { label: '垃圾分类', path: '/pages/rubbish_categary/index' },{ label: '垃圾分类', path: '/pages/rubbish_categary/index' },
        ],
        // 存放下载新闻的容器，套数组
        newsGroups: [],
      }
    },
    mounted() {
      this.getWxNews()
      this.getTtNews()
    },
    methods: {
      /**
       * 获取微信新闻
       */
      getWxNews() {
        uni.request({
          url: 'https://api.tianapi.com/wxnew/?key=4641dbc0816d3ac895f65462c1d967fd&num=10',
          success: res => {
            this.newsGroups.push({
              list: res.data.newslist,
              label: '微信',
            })
          }
        })
      },
      /**
       * 获取头条新闻
       */
      getTtNews() {
        uni.request({
          url: 'https://api.tianapi.com/topnews/?key=4641dbc0816d3ac895f65462c1d967fd',
          success: res => {
            this.newsGroups.push({
              list: res.data.newslist,
              label: '头条',
            })
          }
        })
      },
    }
  }
</script>

<style scoped lang='less'>
  .page {
    display: block;
  }

  .utils {
    height: 38%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: space-between;

    .util {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200upx;
      height: 120upx;
    }

    .util-hover {
      border: 2upx solid #666;
    }
  }
</style>
