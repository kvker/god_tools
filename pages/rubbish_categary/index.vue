<template>
  <view class="page">
    <text class="idx">当前进度：{{progress}} 耗时：{{showTime}}秒</text>
    <view class="question">{{question.name}}</view>
    <view class="ctrls">
      <button class="ctrl" @click="checkResult(1)"></button>
      <button class="ctrl" @click="checkResult(2)"></button>
      <button class="ctrl" @click="checkResult(4)"></button>
      <button class="ctrl" @click="checkResult(8)"></button>
    </view>
  </view>
</template>

<script>
  import rubbishs from '@/assets/rubbish.json'
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
  // 完成数超过66则成功
  const maxCompleteCount = 100
  let interval

  export default {
    components: {},
    data() {
      return {
        question: {},
        progress: 0,
        // 计时器
        time: 0,
      }
    },
    computed: {
      /**
       * 用于显示的，即消除浮点问题的计时器
       */
      showTime() {
        return this.time.toFixed(1)
      },
    },
    mounted() {
      this.startTime()
      this.generateQuestion()
    },
    destroyed() {
      if (interval) {
        clearInterval(interval)
      }
    },
    methods: {
      startTime() {
        interval = setInterval(() => {
          this.time += .1
        }, 100)
      },
      generateQuestion() {
        this.question = rubbishs[Math.floor(Math.random() * rubbishs.length)]
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
              success: function(res) {
                if (res.confirm) {} else if (res.cancel) {

                }
              }
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
    }
  }
</script>

<style scoped lang='less'>
  .page {
    justify-content: space-between;
  }

  .question {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 80upx;
  }

  .ctrls {
    display: flex;
    flex-wrap: wrap;

    .ctrl {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      height: 210upx;
      color: white;

      &:after {
        border: 0;
      }

      &:nth-child(1) {
        background: url(~@/assets/icon.jpg) 0 0 ~'/'400% auto no-repeat;
      }

      &:nth-child(2) {
        background: url(~@/assets/icon.jpg) 33.3% 0 ~'/'400% auto no-repeat;
      }

      &:nth-child(3) {
        background: url(~@/assets/icon.jpg) 66.6% 0 ~'/'400% auto no-repeat;
      }

      &:nth-child(4) {
        background: url(~@/assets/icon.jpg) 100% 0 ~'/'400% auto no-repeat;
      }

      &:after {}
    }
  }

  .share-box {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.2);
  }
</style>
