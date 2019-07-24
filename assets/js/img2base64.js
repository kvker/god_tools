import upng from '@/libs/upng'

export default (canvasId, filePath) => {
  return new Promise(resolve => {
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
              // #ifdef APP-PLUS
              plus.io.resolveLocalFileSystemURL(filePath, entry => {
                entry.file(file => {
                  let fileReader = new plus.io.FileReader()
                  fileReader.readAsDataURL(file)
                  fileReader.onloadend = evt => {
                    resolve({
                      base64: evt.target.result,
                    })
                  }
                })
              })
              // #endif
              
              // #ifndef APP-PLUS
              let pngData = upng.encode([res.data.buffer], width, height)
              let base64 = 'data:image/png;base64,' + wx.arrayBufferToBase64(pngData)
              resolve({
                base64,
              })
              // #endif
            }
          })
        })
      }
    })
  })
}
