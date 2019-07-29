import commonPageMixin from '@/mixins/common_page.js'

  export default {
    mixins: [commonPageMixin],
    onLoad(option) {
      if (option.title) {
        uni.setNavigationBarTitle({
          title: option.label
        })
      }
    }
  }
