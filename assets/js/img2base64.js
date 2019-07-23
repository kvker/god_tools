import upng from '@/libs/upng'

export default (canvasId) => {
  return new Promise(resolve => {
    let canvas = uni.createCanvasContext(canvasId)
    uni.chooseImage({
      count: 1,
      success: res => {
        let filePath = res.tempFilePaths[0]
        uni.getImageInfo({
          src: filePath,
          success: function(image) {
            let width = image.width
            let height = image.height
            canvas.drawImage(filePath, 0, 0, width, height)
            canvas.draw(false, res => {
              uni.canvasGetImageData({
                canvasId,
                x: 0,
                y: 0,
                width,
                height,
                success: res => {
                  let pngData = upng.encode(res.data.buffer, width, height)
                  let base64 = wx.arrayBufferToBase64(pngData)
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
      }
    })
  })
}
