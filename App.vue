<script>
  export default {
    onLaunch: function() {
      console.log('App Launch')
      this.$AV.User.loginWithWeapp().then(user => {
        console.log({user})
      }).catch(console.error)
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
    height: 100vh;
  }
</style>
