<template>
  <div class="page shop">
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" indicator-color="#000" indicator-active-color="#fff">
      <swiper-item v-for="(swiper, index) in imgUrls" :key="index">
        <image :src="swiper" />
      </swiper-item>
    </swiper>
    <!-- 商家介绍 -->
    <div class="shop-wrap">
      <h1 class="shop-name">米店百人咖啡</h1>
      <ul class="contact-list">
        <li class="item">
          <image class="icon" src="/static/icons/icon-tel.png" />
          <span class="desc">86499890</span>
          <image class="icon" src="/static/icons/icon-arr.png" />
        </li>
        <li class="item">
          <image class="icon" src="/static/icons/icon-pos.png" />
          <span class="desc">三堡街141号创意街区21号</span>
          <image class="icon" src="/static/icons/icon-arr.png" />
        </li>
      </ul>
      <div class="shop-intro">
        <h2 class="title">商户介绍</h2>
        <div class="desc">
          曾经的这里原是常州第五毛纺织的医务室。一楼为医疗区，
          为本厂职工和职工直系家属进行一般疾病的诊断，二楼配有
          病床，供本厂职工住院治疗和疗养。
        </div>
      </div>
    </div>
    <gap></gap>
    <!-- 精选留言 -->
    <div class="shop-msg">
      <h2 class="title">精选留言</h2>
      <ul class="msg-list">
        <li class="item" v-for="(item, index) in msgs" :key="index">
          <image :src="item.avatar" />
          <div class="content">
            <div class="top">
              <span class="username">{{item.username}}</span>
              <span class="updatetime">{{item.updatetime}}</span>
            </div>
            <div class="desc">{{item.msg}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="more">查看更多</div>
    <gap></gap>
    <!-- 留言 -->
    <div class="leave-msg">
      <image src="/static/icons/icon-edt.png"/>
      <span class="text">写下你对这里的看法</span>
    </div>
  </div>
</template>

<script>
  import banner from '@/components/banner'
  import gap from '@/components/gap'

  export default {
    data(){
      return {
        imgUrls: [],
        msgs: [],
      }
    },
    created(){
      this.getBanner()
      this.getMsg()
    },
    methods: {
      getBanner(){
        this.imgUrls = [
          '/static/banner/1.jpg',
          '/static/banner/1.jpg',
          '/static/banner/1.jpg',
          '/static/banner/1.jpg',
          '/static/banner/1.jpg',
        ]
      },
      getMsg(){
        this.msgs = [
          {
            avatar: '/static/avatar/1.jpg',
            username: '凌乱的卷毛怪',
            updatetime: '2018-02-02',
            msg: '还是很不错的。'
          },{
            avatar: '/static/avatar/1.jpg',
            username: '凌乱的卷毛怪',
            updatetime: '2018-02-02',
            msg: '还是很不错的。'
          },{
            avatar: '/static/avatar/1.jpg',
            username: '凌乱的卷毛怪',
            updatetime: '2018-02-02',
            msg: '还是很不错的。'
          },
        ]
      },
    },
    components: {
      banner,
      gap,
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import './shop.styl'
</style>