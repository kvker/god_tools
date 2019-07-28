<script>
  export default {
    onLaunch() {
      this.$http.avUser.loginWithWeapp().then(user => {
        this.$globalData.user = user.toJSON()
      })
    },
    onShow() {},
    onHide() {}
  }
</script>

<style lang="less">
  /*每个页面公共css */
  view,
  scroll-view,
  button,
  navigator {
    box-sizing: border-box !important;
    font-size: 28upx;
  }
  
  view, input {
    box-sizing: border-box;
  }

  rich-text {
    line-height: 48upx;
  }

  .button {
    min-width: 120upx;
    padding: 8upx 16upx;
    border: 2upx solid #666;
    border-radius: 8upx;
    text-align: center;
  }

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
  .highlight {
    color: black;
  }

  .contact {
    @size: 64upx;
    position: fixed;
    right: 16upx;
    top: 340upx;
    width: @size;
    line-height: @size;
    border-radius: 50%;
    background: white;
    box-shadow: 0 0 4upx #666;
    padding: 0;
    font-size: 24upx;

    &:after {
      border: none;
    }
  }
</style>
