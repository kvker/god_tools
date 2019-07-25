import AV from '@/libs/av-weapp-min.js'

if(!(AV.applicationId && (AV.applicationKey || AV.masterKey))) {
  AV.init("vdTAziqW4rPfnhY0yqR8wXIv-9Nh9j0Va", "zRCcC5Mg9iOupMgwwGmd54b3")
}

// 天行Api的AppKey
const TAK = 'e3714a97786a795065d75327d2850115'

export default {
  avQuery: AV.Query,
  avUser: AV.User,
  avObject: AV.Object,
  /**
     * av删除对象
     * @param {string} classs 新增对象的累
     * @param {object} params 新增参数
     */
  avCreate(classs, params) {
    var Obj = AV.Object.extend(classs)
    let obj = new Obj()

    // 设置属性
    for(const key in params) {
      if(params.hasOwnProperty(key)) {
        const element = params[key]
        obj.set(key, element)
      }
    }
    obj.set('user', this.user)

    // 将对象保存到云端
    return new Promise((resolve, reject) => {
      obj.save().then(res => {
        // 成功保存之后，执行其他逻辑
        resolve(res.toJSON())
      }, err => {
        reject()
        uni.showToast({
          title: err.rawMessage
        })
      })
    })
  },
  /**
   * av基础获取
   * @param {string} classs 搜索类名
   * @param {function} cbForQuery 设置查询条件的中介函数
   */
  avRetrieve(classs, cbForQuery) {
    let query = new AV.Query(classs)
    // 如果需要额外设置条件，则通过传入这个函数处理
    if(cbForQuery) {
      cbForQuery(query)
    }
    return new Promise((resolve, reject) => {
      query.find()
        .then(res => {
          resolve(res.map(i => i.toJSON()))
        }, err => {
          reject()
          uni.showToast({
            title: err.rawMessage
          })
        })
    })
  },
  /**
   * av更新对象
   * @param {string} classs 更新对象的累
   * @param {string} id 更新对象的objectId
   * @param {object} params 更新内容
   */
  avUpdate(classs, id, params) {
    let obj = AV.Object.createWithoutData(classs, id)
    // 设置属性
    for(const key in params) {
      if(params.hasOwnProperty(key)) {
        const element = params[key]
        obj.set(key, element)
      }
    }
    obj.set('user', this.user)
    return new Promise((resolve, reject) => {
      obj.save()
        .then(res => {
          resolve(res.toJSON())
        }, err => {
          reject()
          uni.showToast({
            title: err.rawMessage
          })
        })
    })
  },
  /**
   * av删除对象
   * @param {string} classs 删除对象的累
   * @param {string} id 删除对象的objectId
   */
  avDelete(classs, id) {
    let obj = AV.Object.createWithoutData(classs, id)
    obj.set('user', this.user)
    return new Promise((resolve, reject) => {
      obj.destroy()
        .then(() => {
          resolve()
        }, err => {
          reject()
          uni.showToast({
            title: err.rawMessage
          })
        })
    })
  },
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
    return new Promise(resolve => {
      uni.request({
        url,
        data: params,
        success: ({
          data
        }) => {
          if (data.code === 200) {
            resolve(data.newslist)
          } else {
            uni.showToast({
              title: data.msg,
            })
            resolve()
          }
        },
      })
    })
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
    return new Promise(resolve => {
      uni.request({
        url,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data,
        success: ({
          data
        }) => {
          if (data.code === 200) {
            resolve(data.newslist)
          } else {
            uni.showToast({
              title: data.msg,
            })
            resolve()
          }
        }
      })
    })
  },
}
