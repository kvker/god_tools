<script>
  export default {
    onLaunch: function() {
      console.log('App Launch')
      // this.$AV.User.loginWithWeapp().then(user => {
      //   console.group()
      //   console.log('登陆成功，用户信息：')
      //   console.log(user)
      //   console.groupEnd()
      // }).catch(console.error)
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
</script>

<style>
  /*每个页面公共css */
  .page {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 80upx);
  }
  /* #ifdef MP */
  .page {
    height: 100vh;
  }
  /* #endif */
</style>
