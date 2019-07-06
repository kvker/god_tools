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
    <view class="share-box" v-if="shareShow">
      <share
        shareImg="https://www.xyzgy.xyz/image/xyz.jpg"
        :title="'66道垃圾分类，用了' + showTime + '秒，敢来吗？'"
        author="每日66问"
        imgScan="https://www.xyzgy.xyz/image/xyz.jpg"
        :bottomType="0"
        :isWhiteSpace="false"
        :borderRadius="20"
        :shareImgW="574"
        :shareImgH="548"
        :padding="0"
        :bottomPadding="[40, 20]"
        @savePhoto="savePhoto"
      />
    </view>
  </view>
</template>

<script>
import share from '@/components/share'
import rubbishs from '@/assets/rubbish.json'
const results = [{ name: '可回收', categroy: 1, }, { name: '有害垃圾', categroy: 2, }, { name: '厨余（湿垃圾）', categroy: 4, }, { name: '其他（干垃圾）', categroy: 8, }]
// 完成数超过66则成功
const maxCompleteCount = 1
let interval

export default {
  components: {
    share
  },
  data() {
    return {
      question: {},
      progress: 0,
      // 计时器
      time: 0,
      shareShow: false,
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
      interval = setInterval(() => {
        this.time += .1
      }, 100)
    },
    generateQuestion() {
      this.question = rubbishs[Math.floor(Math.random() * rubbishs.length)]
    },
    checkResult(categroy) {
      // 答对了的情况，加速弹框显示，增加一次
      if(categroy === this.question.categroy) {
        // 66次答完
        this.progress++
        if(this.progress >= maxCompleteCount) {
          this.shareShow = true
          clearInterval(interval)
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
.share-box {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,.2);
}
</style>
