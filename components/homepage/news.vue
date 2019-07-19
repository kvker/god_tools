<template>
  <view class="news-box">
    <view class="buttons">
      <view class="button" :class="{highlight: currentIdx === idx}" v-for="(newsGroup, idx) of newsGroups" :key="`nb${idx}`"
        @click="clickButton(idx)">{{newsGroup.label}}</view>
    </view>
    <scroll-view scroll-y class="news-group">
      <view class="news" v-for="(news, nidx) of newsGroup.list" :key="`ng${nidx}`">
        <text class="desc">{{news.title}}</text>
        <view class="button" @click="copyLink(nidx)">链接</view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    props: {
      newsGroups: {
        type: Array,
        default () {
          return []
        }
      },
    },
    data() {
      return {
        currentIdx: 0,
      }
    },
    computed: {
      newsGroup() {
        return this.newsGroups[this.currentIdx] || { list: [] }
      },
    },
    methods: {
      clickButton(idx) {
        if(this.currentIdx === idx) {
          this.$emit('update', idx)
        } else {
          this.currentIdx = idx
        }
      },
      copyLink(idx) {
        let item = this.newsGroup.list[idx]
        uni.setClipboardData({
          data: item.url.replace(/\&amp;/g, '&'),
        })
      },
    },
  }
</script>

<style scoped lang="less">
  .news-box {
    height: 62%;
  }

  .buttons {
    width: 100%;
    display: flex;

    .button {
      flex: 1;
    }
  }

  .news-group {
    height: calc(100% - 72upx);

    .news {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      min-height: 100upx;
      padding: 0 16upx;
      margin: 16upx 0 0;

      .button {
        margin-left: 8upx;
      }
    }
  }
</style>
