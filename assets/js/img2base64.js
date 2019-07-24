import upng from '@/libs/upng'

export default (canvasId, filePath) => {
  return new Promise(resolve => {
    uni.showLoading({
      title: '过程可能慢，请稍等...',
      mask: true,
      success: res => {
        setTimeout(() => {
          uni.hideLoading()
        }, 10000)
      }
    })
    uni.getImageInfo({
      src: filePath,
      success: image => {
        let width = image.width
        let height = image.height
        let canvas = uni.createCanvasContext(canvasId)
        canvas.drawImage(filePath, 0, 0, width, height)
        canvas.draw(false, res => {
          uni.canvasGetImageData({
            canvasId,
            x: 0,
            y: 0,
            width,
            height,
            success: res => {
              let pngData = ''
              try {
                pngData = upng.encode([res.data.buffer], width, height)
              } catch (e) {
                console.log(e.message)
                pngData = ''
              }
              uni.hideLoading()

              let base64 = 'data:image/png;base64,' + wx.arrayBufferToBase64(pngData)
              resolve({
                filePath,
                image,
                base64,
              })
            }
          })
        })
      }
    })
  })
}
