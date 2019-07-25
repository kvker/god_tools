<template>
  <view class="page" v-if="!downloaded">请求数据中...（{{totalCount}}条）</view>
  <view class="page" v-else>
    <view class="idx">计时 {{showTime}} 进度 {{progress}}</view>
    <view class="question">{{question.name}}</view>
    <view class="change" @click="generateQuestion">换一换</view>
    <view class="ctrls">
      <button class="ctrl" @click="checkResult(1)"></button>
      <button class="ctrl" @click="checkResult(2)"></button>
      <button class="ctrl" @click="checkResult(4)"></button>
      <button class="ctrl" @click="checkResult(8)"></button>
    </view>
  </view>
</template>

<script>
  import dayjs from 'dayjs'
  const classs = 'RubbishCategory'

  const results = [{
    name: '可回收物',
    categroy: 1,
  }, {
    name: '有害垃圾',
    categroy: 2,
  }, {
    name: '厨余垃圾',
    categroy: 4,
  }, {
    name: '其他垃圾',
    categroy: 8,
  }]

  // 完成数超过100则成功
  const maxCompleteCount = 100
  // 计时器句柄
  let interval

  // 每次获取的最大值，超过1000页没用，还是下发1000
  const limit = 1000
  // 数据加载完成显示时间
  const waitTime = 1000

  export default {
    data() {
      return {
        question: {},
        progress: 0,
        // 计时器
        time: 0,
        title: '垃圾分类练习题',
        // 是否下载完成
        downloaded: false,
        list: [],
        skipTimes: 0,
      }
    },
    computed: {
      /**
       * 用于显示的，即消除浮点问题的计时器
       */
      showTime() {
        let pointLeftNumberLength = this.$util.pointLeftNumberLength
        return `${pointLeftNumberLength(~~(this.time / 3600))}:${pointLeftNumberLength(~~(this.time / 60) % 60)}:${pointLeftNumberLength(this.time % 60)}`
      },
      /**
       * 分页获取垃圾分类数据的次数，相当于页码
       */
      totalCount() {
        return this.list.length
      },
    },
    onLoad(option) {
      this.getList()
    },
    destroyed() {
      if (interval) {
        clearInterval(interval)
      }
    },
    methods: {
      getList() {
        this.list = JSON.parse(uni.getStorageSync(this.$storageKeys.STORAGE_RUBBISH_CATEGORY_KEY) || '[]')
        if (!this.list.length) {
          this.updateList()
        } else {
          setTimeout(() => {
            this.downloaded = true
            // 所有都获取后，开始游戏
            this.startTime()
            this.generateQuestion()
          }, waitTime)
        }
      },
      async updateList() {
        let res = await this.$http.avRetrieve(classs, query => {
          query.limit(limit)
          query.skip(limit * this.skipTimes)
        })
        this.list.push.apply(this.list, res)
        if (res.length >= limit) {
          this.skipTimes++
          this.updateList()
        } else {
          uni.setStorage({
            key: this.$storageKeys.STORAGE_RUBBISH_CATEGORY_KEY,
            data: JSON.stringify(this.list),
            complete: () => {
              setTimeout(this.getList, waitTime)
            }
          })
        }
      },
      startTime() {
        interval = setInterval(() => {
          this.time += 1
        }, 1000)
      },
      generateQuestion() {
        this.question = this.list[Math.floor(Math.random() * this.totalCount)]
      },
      checkResult(categroy) {
        // 答对了的情况，加速弹框显示，增加一次
        if (categroy === this.question.categroy) {
          this.progress++
          // 66次答完
          if (this.progress >= maxCompleteCount) {
            clearInterval(interval)
            uni.showModal({
              title: '提示',
              content: `完成，耗时${this.showTime}秒。`,
            })
            return
          }
          this.generateQuestion()
        } else {
          let duration = 3000
          uni.showToast({
            icon: 'none',
            title: `答错，${results.find(i => i.categroy === this.question.categroy).name}`,
            mask: true,
            duration,
            success: () => {
              setTimeout(() => {
                this.generateQuestion()
              }, duration)
            }
          })
        }
      },
    },
  }
</script>

<style scoped lang='less'>
  .page {
    justify-content: space-between;
    align-items: center;
    background: #EFFFF5;
  }

  .border {
    border: 2px solid #1B3304;
    border-radius: 10upx;
  }

  .idx {
    .border;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 487upx;
    height: 66upx;
    background: white;
    font-size: 38upx;
    font-family: PingFangSC-Regular;
    color: rgba(22, 72, 11, 1);
  }

  .question {
    .border;
    width: 480upx;
    height: 249upx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 80upx;
    background: white;
  }

  .change {
    .border;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200upx;
    height: 66upx;
    background: #90CF93;
    font-size: 38upx;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(239, 255, 245, 1);
  }

  .ctrls {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    .ctrl {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      height: 240upx;
      color: white;
      background: url(https://lc-vdtaziqw.cn-e1.lcfile.com/a122e504699a06628671/rubbish_category_icon.png) 0 0 ~'/'400% auto no-repeat;

      &:after {
        border: 0;
      }

      &:nth-child(2) {
        background-position-x: 33.3%;
      }

      &:nth-child(3) {
        background-position-x: 66.7%;
      }

      &:nth-child(4) {
        background-position-x: 100%;
      }
    }
  }
</style>
