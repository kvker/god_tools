<template>
  <view class="page">
    <text class="idx">当前进度：{{progress}} 耗时：{{showTime}}秒</text>
    <view class="question">{{question.name}}</view>
    <view class="ctrls">
      <button class="ctrl" @click="checkResult(1)">可回收</button>
      <button class="ctrl" @click="checkResult(2)">有害垃圾</button>
      <button class="ctrl" @click="checkResult(4)">厨余（湿垃圾）</button>
      <button class="ctrl" @click="checkResult(8)">其他（干垃圾）</button>
    </view>
  </view>
</template>

<script>
import rubbishs from '@/assets/rubbish.json'
const results = [{ name: '可回收', categroy: 1, }, { name: '有害垃圾', categroy: 2, }, { name: '厨余（湿垃圾）', categroy: 4, }, { name: '其他（干垃圾）', categroy: 8, }]
// 完成数超过66则成功
const maxCompleteCount = 66

export default {
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
  methods: {
    startTime() {
      setInterval(() => {
        this.time += .1
      }, 100)
    },
    generateQuestion() {
      this.question = rubbishs[Math.floor(Math.random() * rubbishs.length)]
    },
    checkResult(categroy) {
      // 答对了的情况，加速弹框显示，增加一次
      if(categroy === this.question.categroy) {
        this.progress++
        this.generateQuestion()
        // 66次答完
        if(this.progress >= maxCompleteCount) {
          console.log('今天答完了')
        }
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
    width: 50%;
    height: 200upx;
    color: white;
    &:nth-child(1) {
      background: green;
    }
    &:nth-child(2) {
      background: red;
    }
    &:nth-child(3) {
      background: blue;
    }
    &:nth-child(4) {
      background: grey;
    }
    &:after {
    }
  }
}
</style>
