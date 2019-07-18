<template>
  <view class="page">
    <news class='news' :newsGroups="newsGroups" @update='updateNews'></news>
    <view class="utils">
      <navigator class="util" hover-class="util-hover" v-for="(item, idx) in utils" :key='`${idx}rc`' :url="handleUrl(item)">{{item.label}}</navigator>
    </view>
    <button class="contact" open-type="contact">问</button>
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
        utils: [{ label: '垃圾分类', path: '/pages/rubbish_categary/index' },

          // 单参数搜索页面，key是传入请求参数
          { label: '姓氏起源', path: `/pages/search/index?path=${this.$api.NAME_FROM}&key=xing` },
          // 获取信息页面，keys是返回拼接参数列表，要按照顺序传
          { label: '神回复', path: `/pages/get_info/index?path=${this.$api.GOD_REPLY}&keys=["title","content"]&num=10` },
          { label: '顺口溜', path: `/pages/get_info/index?path=${this.$api.SHUN_KOU_LIU}&keys=["content"]&num=10` },
          
          { label: '敬请期待', path: '/pages/rubbish_categary/index' },
        ],
        // 存放下载新闻的容器，套数组
        newsGroups: [],
        // 请求的顺序函数，用来刷新
        funcs: [],
      }
    },
    mounted() {
      if (this.$isPro) {
        this.getWx()
        this.getTt()
        this.getKejis()
        this.getApples()
      }
    },
    methods: {
      /** 
       * 请求新闻的统一函数，基准函数
       * @param {String} path 请求地址
       * @param {Object} params 请求参数
       * @param {String} label 显示的title
       * @param {Function} func 刷新调用的具体函数
       * @param {Number} idx 传入idx则为刷新
       */
      getNews(path, params, label, func, idx) {
        let isFresh = typeof(idx) === 'number'
        let item = {
          list: [],
          label,
        }
        if (isFresh) {
          this.$set(this.newsGroups, idx, item)
        }
        this.$http.tGet(path, params, res => {
          if (res) {
            item.list = res
            if (isFresh) {
              this.$set(this.newsGroups, idx, item)
            } else {
              this.funcs.push(func)
              this.newsGroups.push(item)
            }
          }
        })
      },
      /**
       * 获取微信新闻
       * @param {Number} idx 如果有idx则为刷新，首次调用不传的
       */
      getWx(idx) {
        this.getNews(this.$api.WEIXIN_NEWS, { num: 10 }, '微信', this.getWx, idx)
      },
      /**
       * 获取头条新闻
       * @param {Number} idx 如果有idx则为刷新，首次调用不传的
       */
      getTt(idx) {
        this.getNews(this.$api.TOUTIAO_NEWS, null, '头条', this.getTt, idx)
      },
      /**
       * 获取科技新闻
       * @param {Number} idx 如果有idx则为刷新，首次调用不传的
       */
      getKejis(idx) {
        this.getNews(this.$api.KEJI_NEWS, null, '科技', this.getKejis, idx)
      },
      /**
       * 获取科技新闻
       * @param {Number} idx 如果有idx则为刷新，首次调用不传的
       */
      getApples(idx) {
        this.getNews(this.$api.APPLE_NEWS, null, '苹果', this.getApples, idx)
      },
      /**
       * 根据点击索引刷新内容
       * @param {Number} idx 点击的按钮索引
       */
      updateNews(idx) {
        this.funcs[idx](idx)
      },
      handleUrl(item) {
        let path = item.path
        if (path.includes('?')) {
          path += `&title=${item.label}`
        }
        return path
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
      border: 2upx dashed #666;
      border-radius: 16upx;
    }

    .util-hover {
      border: 2upx solid #666;
    }
  }
</style>
