export default {
  data() {
    return {
      searchStr: '',
      result: '请搜索',
      resultList: ['请搜索'],
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
      this.result = '......'
      this.resultList = ['......']
      this.searchResult()
    },
  },
}