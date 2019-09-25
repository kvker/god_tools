<template>
  <view class="page">
    <canvas canvas-id="canvas"></canvas>
    <image :src="preview_url" mode="aspectFit"></image>
    <view class="button" @click="chooseImg">选择图片</view>
    <view class="img-box">
      <image :src="result_url" mode="aspectFit" @click="getUrl"></image>
      <view v-if="result_url" class="remind">点击图片获取链接</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        preview_url: '',
        result_url: '',
      }
    },
    onLoad(option) {

    },
    methods: {
      chooseImg() {
        uni.chooseImage({
          success: async res => {
            this.result_url = ''
            uni.showLoading({})
            setTimeout(uni.hideLoading, 10000)
            let path = res.tempFilePaths[0]
            this.preview_url = path
            let {
              base64
            } = await this.$util.img2Base64(path, 'canvas')
            this.$http.tPost('/handle/imgtx/', {
              img: base64,
            }).then(res => {
              uni.hideLoading()
              let picurl = res[0].picurl
              this.result_url = picurl
            })
          }
        })
      },
      getUrl() {
        uni.setClipboardData({
          data: this.result_url,
          success: res => {
            uni.showToast({
              title: '复制成功',
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang='less'>
  .page {
    justify-content: space-evenly;
    align-items: center;
  }

  canvas {
    position: absolute;
    left: 0;
    top: -10000px;
    width: 2000px;
    height: 2000px;
  }

  image {
    @size: 400upx;
    width: @size;
    height: @size;
    border: 2upx solid #333333;
    border-radius: 32upx;
  }
  .remind {
    font-size: 24upx;
    color: #999;
  }
</style>
