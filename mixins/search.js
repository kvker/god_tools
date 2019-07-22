export default {
  data() {
    return {
      searchStr: '',
      result: '请搜索',
      resultList: ['请搜索'],
      title: '',
    }
  },
  onLoad(option) {
    if(option.label) {
      this.title = option.label
    }
  },
  methods: {
    inputSearch() {
      if(!this.searchStr) {
        this.resultList = ['请搜索']
        this.result = '请搜索'
      }
    },
    search() {
      this.result = '获取中...'
      this.resultList = ['获取中...']
      this.searchResult()
    },
  },
}