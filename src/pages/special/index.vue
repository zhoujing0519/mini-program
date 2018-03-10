<template>
  <div class="page special">
    <!-- 知名商户 -->
    <div class="shop-wrap">
      <h2 class="title">知名商户</h2>
      <ul class="shop-list">
        <li class="shop" v-for="(shop, index) in shops" :key="index">
          <image :src="shop.logo"/>
          <span class="name">{{shop.name}}</span>
        </li>
      </ul>
    </div>
    <!-- 特色活动 -->
    <div class="event-wrap">
      <h2 class="title">特色活动</h2>
      <ul class="event-list">
        <li class="event" v-for="(event, index) in events" :key="index">
          <image :src="event.imgUrl"/>
          <div class="content">
            <h3 class="event-title">{{event.title}}</h3>
            <span class="updatetime">{{event.updatetime}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        shops: [],
        events: [],
      }
    },
    created(){
      this.getShops()
      this.getEvents()
    },
    methods: {
      // 获取商户
      getShops(){
        this.shops = [
          {
            logo: '/static/logos/1.jpg',
            name: '微信'
          },{
            logo: '/static/logos/1.jpg',
            name: '微信'
          },{
            logo: '/static/logos/1.jpg',
            name: '微信'
          },{
            logo: '/static/logos/1.jpg',
            name: '微信'
          },{
            logo: '/static/logos/1.jpg',
            name: '微信'
          },{
            logo: '/static/logos/1.jpg',
            name: '微信'
          },{
            logo: '/static/logos/1.jpg',
            name: '微信'
          },{
            logo: '/static/logos/1.jpg',
            name: '微信'
          },
        ]
      },
      // 获取活动
      getEvents(){
        this.events = [
          {
            imgUrl: '/static/test/1.jpg',
            title: '【五号活动】感谢有你，在古运河邂逅这座城的温暖',
            updatetime: '2018-02-02',
          },{
            imgUrl: '/static/test/1.jpg',
            title: '【五号活动】感谢有你，在古运河邂逅这座城的温暖',
            updatetime: '2018-02-02',
          },{
            imgUrl: '/static/test/1.jpg',
            title: '【五号活动】感谢有你，在古运河邂逅这座城的温暖',
            updatetime: '2018-02-02',
          },
        ]
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import './special.styl'
</style>