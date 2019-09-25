import upng from '@/libs/upng'
import http from '@/assets/js/http'
import storageKeys from '@/assets/js/data/storage_keys'

let doLastTimeout, doLastOperates = []
let timeout = 500

// RegExp替换资源
const regClasss = 'RegExpReplace'
let regs = []
http.avRetrieve(regClasss, q => {
    q.descending('updatedAt')
  })
  .then(res => {
    regs = res
    uni.setStorageSync(storageKeys.REG_STORAGE_KEY, JSON.stringify(regs))
  }).catch(err => {
    regs = JSON.parse(uni.getStorageSync(REG_STORAGE_KEY) || '[]')
  })

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
          setTimeout(uni.hideLoading, 10000)
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
      uni.getFileSystemManager().readFile({
        filePath, //选择图片返回的相对路径
        encoding: 'base64', //编码格式
        success: res => { //成功的回调
          uni.hideLoading()
          resolve({
            base64: 'data:image/png;base64,' + res.data,
          })
        }
      })
      // #endif
    })
  },
  /**
   * 检查是否有更新
   */
  checkUpdate() {
    // #ifdef MP
    const updateManager = uni.getUpdateManager()

    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      if (!this.$isPro) {
        console.log('是否有更新：' + res.hasUpdate)
      }
    })

    updateManager.onUpdateReady(function(res) {
      uni.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function(res) {
      // 新的版本下载失败
    })
    // #endif
  },
  /**
   * @param {String} str 正则规则修改文本
   */
  replaceWords(str) {
    regs.forEach(item => {
      let reg = new RegExp(item.before, item.rule)
      // console.log(reg)
      // console.log(str)
      str = str.replace(reg, item.after)
      // console.log(str)
    })
    return str
  },
  /**
   * 数字整数部分保持一定长度，不足用0补充，比如时间
   * @params {number} num 传入的数字
   * @params {number} length 数字左侧留着的长度，默认2是作为常用倒计时
   */
  pointLeftNumberLength(num, length = 2) {
    if (typeof(num) === 'number') {
      let numStr = String(num)
      let leftLength = numStr.split('.')[0].length
      if (length > leftLength) {
        let lengthCut = length - leftLength
        let zeroStr = Array.from({
          length: lengthCut
        }, () => '0').join('')
        numStr = zeroStr + numStr
      }
      return numStr
    } else {
      throw '传数字类型!'
    }
  },
}
//
