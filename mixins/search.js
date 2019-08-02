export default {
    data() {
      return {
        list: [],
        searchStr: '',
        result: '请搜索',
        resultList: ['请搜索'],
        placeholder: '请搜索',
      }
    },
    onLoad(option) {
      if (option.placeholder) {
        this.placeholder = option.placeholder
      }
    },
    methods: {
      inputSearch(e) {
        if (!this.searchStr) {
          this.resultList = ['请搜索']
          this.result = '请搜索'
        }
        this.searchStr = e.detail.value
      },
      search() {
        this.result = '获取中...'
        this.resultList = ['获取中...']
        this.searchResult()
      },
    },
  }
