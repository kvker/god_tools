<template>
  <view class="page">
    <money></money>
    <view class="utils">
      <navigator class="util" hover-class="util-hover" v-for="(item, idx) in utils" :key='`${idx}rc`' :url="handleUrl(item)">{{item.label}}</navigator>
    </view>
    <button class="contact" open-type="contact">问</button>
  </view>
</template>

<script>
  import money from '@/components/homepage/money'

  export default {
    components: {
      money,
    },
    data() {
      return {
        utils: [{ label: '垃圾分类', path: '/pages/rubbish_categary/index' },

          // 单参数搜索页面，key是传入请求参数
          { label: '姓氏起源', path: `/pages/search/index?path=${this.$api.NAME_FROM}&key=xing` },
          { label: '实时油价', path: `/pages/search/index?path=${this.$api.OIL_PRICE}&key=prov` },
          
          
          // 获取信息页面，keys是返回拼接参数列表，要按照顺序传
          { label: '神回复', path: `/pages/info/index?path=${this.$api.GOD_REPLY}&keys=["title","content"]` },
          { label: '顺口溜', path: `/pages/info/index?path=${this.$api.SHUN_KOU_LIU}&keys=["content"]` },
          { label: '小段子', path: `/pages/info/index?path=${this.$api.DUAN_ZI}&keys=["author","content"]` },
          { label: '简说历史', path: `/pages/info/index?path=${this.$api.EASY_HISTORY}&keys=["content"]` },
          { label: '精美句子', path: `/pages/info/index?path=${this.$api.NICE_JU_ZI}&keys=["author","content"]` },
          { label: '优美诗句', path: `/pages/info/index?path=${this.$api.NICE_SHI_JU}&keys=["source","author","content"]` },
          { label: '名人名言', path: `/pages/info/index?path=${this.$api.PEOPLE_SAY}&keys=["author","content"]` },

          // 敬请期待，放个笑话
          { label: '敬请期待', path: `/pages/info/index?path=${this.$api.FUNNY}&keys=["title","content"]` },
        ],
      }
    },
    methods: {
      handleUrl(item) {
        let path = item.path
        if (path.includes('?')) {
          path += `&title=${item.label}`
        }
        return path
      },
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
