<template>
  <view class="modal share">
    <canvas class="share-canvas" canvas-id='shareCanvas'></canvas>
    <view class="btn save" @click='clickCheck'>保存分享图</view>
  </view>
</template>

<script>
  import groupImg from '@/assets/img/little_target_bill_group.jpg'
  import qrImg from '@/assets/img/god_tools_qr.jpg'
  
  const config = {
    canvasName: 'shareCanvas',
    canvasWidth: 320,
    canvasHeight: 512,
    exportImgPath: '',
  }

  export default {
    props: {
      main: Object,
      totalDays: Number,
    },
    mounted() {
      this.draw()
    },
    methods: {
      draw() {
        let ctx = uni.createCanvasContext(config.canvasName)
        // 绘制背景色
        ctx.setFillStyle('white')
        ctx.fillRect(0, 0, config.canvasWidth, config.canvasHeight)

        // 绘制图片
        let left = 20
        let imgWidth = config.canvasWidth - 2 * left
        ctx.drawImage(groupImg, left, left, imgWidth, imgWidth)

        let qrWidth = 88
        let qrLeft = config.canvasWidth - left - qrWidth
        ctx.drawImage(qrImg, qrLeft, 340, qrWidth, qrWidth)

        // 绘制文本
        let fontSize = 20
        let initialTop = 340
        let marginTop = 8

        let date = new Date()
        ctx.setFontSize(fontSize)
        ctx.setFillStyle('#F3944E')
        ctx.fillText(this.$dayjs().format('YYYY-MM-DD'), 16, initialTop)
        ctx.fillText('小目标账单的第', 16, initialTop + (marginTop + fontSize) * 1)
        ctx.fillText(this.totalDays + '天', 16, initialTop + (marginTop + fontSize) * 2)
        ctx.fillText('成功存下了' + this.main.budget + '元', 16, initialTop + (marginTop + fontSize) * 3)
        ctx.fillText(this.main.target + '的梦想基金', 16, initialTop + (marginTop + fontSize) * 4)
        ctx.setFontSize(12)
        ctx.setFillStyle('#999')
        ctx.fillText('长按识别小程序', 218, initialTop + (marginTop + fontSize) * 4)
        // 直接绘制第二次无效
        ctx.draw(false, this.trans)
      },
      // 转成图片
      trans() {
        let width = config.canvasWidth
        let height = config.canvasHeight
        uni.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: width,
          height: height,
          destWidth: width,
          destHeight: height,
          canvasId: config.canvasName,
          success: res => {
            config.exportImgPath = res.tempFilePath
          },
          fail: err => {
            console.log(err)
          }
        })
      },
      clickCheck() {
        uni.saveImageToPhotosAlbum({
          filePath: config.exportImgPath,
          success: res => {
            uni.showModal({
              title: '存图成功',
              content: '图片成功保存到相册了，去发朋友圈噻~',
              cancelText: '好哒',
              cancelColor: '#F3944E',
              confirmText: '许愿去',
              success: res => {
                if (res.confirm) {
                  this.$emit('close')
                  // todo，删除小目标
                }
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang='less' scoped>
  @import '~@/assets/css/target_bill/mask.less';

  .share {
    flex-direction: column;

    .share-canvas {
      width: 640upx;
      height: 1024upx;
      border-radius: 0;
    }

    .save {
      .buttonHightlight();
      width: 420upx;
      height: 90upx;
      background-image: linear-gradient(-180deg, #FECBAA 0%, #F7975D 100%);
      color: white;
    }
  }
</style>
