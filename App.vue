<script>
  export default {
    onLaunch() {
      // #ifdef MP-WEIXIN
      this.$http.avUser.loginWithWeapp().then(user => {
        this.$globalData.sourceUser = user
        this.$globalData.user = user.toJSON()
      })
      
      // 检查更新
      const updateManager = uni.getUpdateManager()
      
      updateManager.onCheckForUpdate(function(res) {
        // 请求完新版本信息的回调
        console.log('是否有更新：' + res.hasUpdate)
      })
      
      updateManager.onUpdateReady(function(res) {
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })
      })
      
      updateManager.onUpdateFailed(function(res) {
        // 新的版本下载失败
      })
      // #endif
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

  view,
  input {
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
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .sub {
    font-size: .5em;
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200upx;
    height: 66upx;
    background: #91CFFF;
    border: 4upx solid black;
    border-radius: 10upx;
    font-size: 32upx;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
  }
  
  .line-btn {
    width: 100%;
  }
  
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
