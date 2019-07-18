// 天行Api的AppKey
const TAK = '4641dbc0816d3ac895f65462c1d967fd'

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
          cb(data)
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
