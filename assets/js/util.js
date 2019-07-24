import upng from '@/libs/upng'

let doLastTimeout, doLastOperates = []
let timeout = 500

export default {
  /**
   * 异步执行的多个操作，只执行最后一个操作，比如输入内容检索
   * @param {function} operate 传入的操作
   * @param {number} idx (可选)执行特性索引号的操作，一般不会用到
   */
  doAsyncLast(operate, time = timeout, idx) {
    if (typeof operate !== 'function') {
      throw '执行doLast函数报错：需要传入函数！'
    }
    clearTimeout(doLastTimeout)
    doLastTimeout = setTimeout(() => {
      let lastOperate = doLastOperates[doLastOperates.length - 1]
      lastOperate()
      doLastOperates = []
      clearTimeout(doLastTimeout)
      doLastTimeout = null
    }, time)
    doLastOperates.push(operate)
  },
  /**
   * 某瞬间同步执行的多个操作，只执行最后一个操作，比如同时多个网络请求返回然后提示消息
   * @param {function} operate 传入的操作
   * @param {number} idx (可选)执行特性索引号的操作，一般不会用到
   */
  doSyncLast(operate, time = timeout, idx) {
    if (typeof operate !== 'function') {
      throw '执行doLast函数报错：需要传入函数！'
    }
    if (!doLastTimeout) {
      doLastTimeout = setTimeout(() => {
        let lastOperate = doLastOperates[doLastOperates.length - 1]
        lastOperate()
        doLastOperates = []
        clearTimeout(doLastTimeout)
        doLastTimeout = null
      }, time)
    }
    doLastOperates.push(operate)
  },
  /** 
   * 图片转Base64
   * @param {String} filePath 图片本地路径
   * @param {String} canvasId 小程序时候使用的canvas-id
   */
  img2Base64(filePath, canvasId) {
    return new Promise(resolve => {
      uni.showLoading({
        title: '处理中...',
        mask: true,
        complete() {
          uni.hideLoading()
        }
      })
      // #ifdef APP-PLUS
      plus.io.resolveLocalFileSystemURL(filePath, entry => {
        entry.file(file => {
          let fileReader = new plus.io.FileReader()
          fileReader.readAsDataURL(file)
          fileReader.onloadend = evt => {
            uni.hideLoading()
            resolve({
              base64: evt.target.result,
            })
          }
        })
      })
      // #endif

      // #ifndef APP-PLUS
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
                let pngData = upng.encode([res.data.buffer], width, height)
                let base64 = 'data:image/png;base64,' + wx.arrayBufferToBase64(pngData)
                uni.hideLoading()
                resolve({
                  base64,
                })
              }
            })
          })
        }
      })
      // #endif
    })
  }
}
