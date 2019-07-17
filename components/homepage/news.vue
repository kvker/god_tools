<template>
  <view class="news-box">
    <view class="buttons">
      <view class="button" v-for="(newsGroup, idx) of newsGroups" :key="`nb${idx}`"></view>
      {{newsGroup.label}}
    </view>
    <view class="news-box">
      <view class="news" v-for="(news, nidx) of newsGroup.list" :key="`ng${nidx}`">
        <image></image>
        <text class="title">{{news.title}}</text>
        <text class="author">{{news.title}}</text>
        <text class="time">{{news.title}}</text>
        <text class="desc">{{news.title}}</text>
        <view class="button">获取链接</view>
      </view>
    </view>
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
  }
</script>

<style scoped lang="less">
  .news-box {
    overflow-y: scroll;
  }

  .buttons {
    width: 100%;
    display: flex;

    .button {
      flex: 1;
    }
  }
</style>
