<template>
  <view class="page">
    <searcher @input='inputSearch' @confirm='search' @clean='clean' :value='searchStr' :placeholder="placeholder"></searcher>
    <scroll-view scroll-y>
      <view v-if="currentInfo" class="recipe">
        <text>名称：{{currentInfo.name}}</text>
        <text>省市：{{currentInfo.province}} {{currentInfo.city}}</text>
        <text>说明：{{currentInfo.content}}</text>
      </view>
      <view v-else class="recipe">
        <text>......</text>
      </view>
    </scroll-view>
    <view class="ctrls">
      <view :style="!currentIndex ? 'opacity: .2;' : 'opcacity: 1;'" class="button" @click="pre">上篇</view>
      <view class="button" @click="copy">拷贝</view>
      <view :style="isLast ? 'opacity: .2;' : 'opcacity: 1;'" class="button" @click="next">下篇</view>
    </view>
  </view>
</template>

<script>
  import searchMixin from '@/mixins/search'
  import singleMixin from '@/mixins/single'
  import searcher from '@/components/searcher.vue'

  export default {
    mixins: [searchMixin, singleMixin],
    components: {
      searcher,
    },
    data() {
      return {
        infos: [],
        currentIndex: 0,
      }
    },
    computed: {
      currentInfo() {
        return this.infos[this.currentIndex]
      },
      isLast() {
        return !this.infos.length || this.currentIndex === this.infos.length - 1
      },
      copyInfo() {
        let item = this.currentInfo
        if (!item) {
          return ''
        }
        return `名称：${item.name}
省市：${item.province}(${item.city})
说明：${item.content}
技术支持：只有神才知道的工具合集（小程序）`
      },
    },
    methods: {
      async search() {
        this.clean()
        let res = await this.$http.tGet(this.url, {
          word: this.searchStr,
          num: 10,
        })
        if (res) {
          this.infos = res
        }
      },
      pre() {
        if (!this.currentIndex) return
        this.currentIndex--
      },
      next() {
        if (this.isLast) return
        this.currentIndex++
      },
      copy() {
        uni.setClipboardData({
          data: this.copyInfo,
        })
      },
      clean() {
        this.currentIndex = 0
        this.infos = []
      }
    }
  }
</script>

<style scoped lang="less">
  .page {
    align-items: center;
  }

  scroll-view {
    width: 690upx;
    height: 600upx;
    margin: 40upx 0 28upx;
    padding: 32upx;
    background: #FFD9AD;
    border: 4upx solid black;
    border-radius: 20upx;
    font-size: 24upx;
    font-family: PingFangSC-Regular;
  }

  .recipe {
    display: flex;
    flex-direction: column;

    text {
      line-height: 40upx;
      margin-bottom: 16upx;
    }
  }

  .ctrls {
    display: flex;
    justify-content: space-between;
    width: 690upx;

    .button {
      width: 200upx;
      height: 66upx;
      background: #fab909;
      border: 4upx solid black;
      border-radius: 10upx;
      font-size: 32upx;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
    }
  }
</style>
