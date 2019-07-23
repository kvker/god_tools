// 天行Api的AppKey
const TAK = 'e3714a97786a795065d75327d2850115'

export default {
  /**
   * 天行Api的Get
   * @param {String} url 地址，带上/
   * @param {Object} data 参数
   * @param {Function} cb 回调
   */
  tGet(path, params, cb) {
    if (!params) params = {}
    params.key = TAK
    let url = 'https://api.tianapi.com' + path
    uni.request({
      url,
      data: params,
      success: ({ data }) => {
        if (data.code === 200) {
          cb(data.newslist)
        } else {
          uni.showToast({
            title: data.msg,
          })
          cb()
        }
      },
      fail: () => {},
      complete: () => {}
    });
  },
  /**
   * 天行Api的POST
   * @param {String} url 地址，带上/
   * @param {Object} data 参数
   * @param {Function} cb 回调
   */
  tPost(path, data, cb) {
    if (!data) data = {}
    data.key = TAK
    let url = 'https://api.tianapi.com' + path
    uni.request({
      url,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data,
      success: ({ data }) => {
        if (data.code === 200) {
          cb(data.newslist)
        } else {
          uni.showToast({
            title: data.msg,
          })
          cb()
        }
      },
      fail: () => {},
      complete: () => {}
    });
  },
}
