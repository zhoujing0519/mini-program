<template>
  <div class="page index">
    <div class="banner-wrap">
      <!-- 轮播图 -->
      <swiper :indicator-dots="true" indicator-color="#000" indicator-active-color="#fff">
        <swiper-item v-for="(swiper, index) in imgUrls" :key="index">
          <image :src="swiper" />
        </swiper-item>
      </swiper>
      <!-- 导航 -->
      <nav class="nav">
        <a class="link" href="/pages/event/event">特色<br>活动</a>
        <a class="link" href="/pages/event/event">创客<br>联盟</a>
        <a class="link" href="/pages/event/event">街区<br>导览</a>
      </nav>
    </div>
    <div class="introduction">
      <h1 class="title-wrap">
        <span class="cn">运河五号</span>
        <span class="en">CANAL FIVE</span>
      </h1>
      <div class="content">
        <p>
          运河五号创意街区位于常州市三堡街，京杭大运河南岸，是常州市实施“中部提升”战略、构建“运河历史文化产业带”的重要节点。“运河五号”串联起原有老街、老巷、老厂，提炼出“创意、记忆、工艺”的内涵，围绕“运河文化、工业遗存、创意产业”的三大主题，利用原常州恒源畅厂、常州第五毛纺织厂、常州梳篦厂、常州航海仪器厂等工业遗存和文化遗迹，加以改造和利用，建设一个设施完备、功能完善、服务全面、氛围独特的吸引设计类创意人才和企业创业和发展的平台。这里也是常州市钟楼区艺术教育实践基地。
        </p>
        <p>
          街区一期建设主要对恒源畅厂、第五毛纺厂的工业遗存加以保护和利用，厂区总占地面积36388㎡、建筑面积32000㎡，厂区内房屋建筑风格独特，从上世纪30年代到80年代，有少部分早期民居、日式建筑，大多数是厂房（尤其是连排锯齿形厂房，非常具有纺织企业的特色）。斑驳的老墙、高大的空间、灵动的线条所承载的工业遗存和文化遗迹，是创意人灵感的源泉，也是打造独特创意空间的理想场所。
        </p>
      </div>
    </div>

    <!-- <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>
      
    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form> -->

  </div>
</template>

<script>
  import card from '@/components/card'
  import banner from '@/components/banner'

  export default {
    data(){
      return {
        motto: 'Hello World',
        userInfo: {},
        imgUrls: [],
      }
    },
    created(){
      // 调用应用实例的方法获取全局数据
      this.getUserInfo()
      this.getBanner()
    },
    components: {
      card,
      banner,
    },
    methods: {
      // 获取banner图
      getBanner(){
        this.imgUrls = [
          '/static/banner/1.jpg',
          '/static/banner/1.jpg',
          '/static/banner/1.jpg',
          '/static/banner/1.jpg',
          '/static/banner/1.jpg',
        ]
      },
      bindViewTap () {
        const url = '../logs/logs'
        wx.navigateTo({ url })
      },
      getUserInfo () {
        // 调用登录接口
        wx.login({
          success: () => {
            wx.getUserInfo({
              success: (res) => {
                this.userInfo = res.userInfo
              }
            })
          }
        })
      },
      clickHandle (msg, ev) {
        console.log('clickHandle:', msg, ev)
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import './index.styl'

.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
</style>
