<script>
  export default {
    onLaunch: function() {
      // console.log('App Launch')
    },
    onShow: function() {
      // console.log('App Show')
      // #ifdef MP
      const updateManager = uni.getUpdateManager()

      updateManager.onCheckForUpdate(function(res) {
        // 请求完新版本信息的回调
        console.log(res.hasUpdate)
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
    onHide: function() {
      // console.log('App Hide')
    }
  }
</script>

<style lang="less">
  /*每个页面公共css */
  view,
  scroll-view,
  button,
  navigator {
    box-sizing: border-box !important;
    color: #666;
    font-size: 28upx;
  }

  rich-text {
    line-height: 48upx;
  }

  .button {
    min-width: 120upx;
    padding: 8upx 16upx;
    border: 2upx solid #666;
    border-radius: 8upx;
    color: #666;
    text-align: center;
  }

  .page {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 80upx);
    padding: 16upx;
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
    @size: 90upx;
    position: fixed;
    right: 24upx;
    bottom: 24upx;
    width: @size;
    line-height: @size;
    border-radius: 50%;
    background: white;
    box-shadow: 0 0 4upx #666;

    &:after {
      border: none;
    }
  }
</style>
