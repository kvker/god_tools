<template>
  <view class="page">
    <news class='news' :newsGroups="newsGroups"></news>
    <view class="utils">
      <navigator class="util" hover-class="util-hover" v-for="(item, idx) in utils" :key='`${idx}rc`' :url="item.path">{{item.label}}</navigator>
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
        utils: [{ label: '垃圾分类', path: '/pages/rubbish_categary/index' }, { label: '敬请期待', path: '/pages/rubbish_categary/index' }, ],
        // 存放下载新闻的容器，套数组
        newsGroups: [],
      }
    },
    mounted() {
      this.getWxNews()
    },
    methods: {
      /**
       * 获取微信新闻
       */
      getWxNews() {
        this.$http.tGet('https://api.tianapi.com/wxnew/', { num: 10 }, res => {
          if (res) {
            this.newsGroups.push({
              list: res.newslist,
              label: '微信',
            })
            this.getTtNews()
            this.getTtKejis()
          }
        })
      },
      /**
       * 获取头条新闻
       */
      getTtNews() {
        this.$http.tGet('https://api.tianapi.com/topnews/', null, res => {
          if (res) {
            this.newsGroups.push({
              list: res.newslist,
              label: '头条',
            })
          }
        })
      },
      /**
       * 获取科技新闻
       */
      getTtKejis() {
        this.$http.tGet('https://api.tianapi.com/keji/', null, res => {
          if (res) {
            this.newsGroups.push({
              list: res.newslist,
              label: '科技',
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
