export default {
  onLoad(option) {
    if (option.title) {
      uni.setNavigationBarTitle({
        title: option.label
      })
    }
  }
}
