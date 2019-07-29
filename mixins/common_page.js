import img from '@/assets/js/data/img'

  export default {
    data() {
      return {
        // 请求的url
        url: '',
        // 请求关键字段
        key: '',
        // 请求条数
        num: 10,
        // 显示的关键字段
        keys: [],
        // 选择的关键字段
        values: [],
        // 是否需要随机获取
        canRandom: false,
        // 页面标题
        title: '',
        // 下发数据纯数组内字符串
        arrayOnly: false,
        resultList: ['请搜索'],
        img,
      }
    },
    onLoad(option) {
      try {
        this.url = option.url
        this.key = option.key
        this.num = option.num || 10
        this.keys = JSON.parse(option.keys || '[]')
        this.values = JSON.parse(option.values || '[]')
        this.hasPage = !!option.hasPage
        this.canRandom = !!option.canRandom
        this.arrayOnly = !!option.arrayOnly
        if (option.label) {
          this.title = option.label
          uni.setNavigationBarTitle({
            title: option.label
          })
        }
      } catch (e) {
        throw '参数不足'
      }
    },
  }
