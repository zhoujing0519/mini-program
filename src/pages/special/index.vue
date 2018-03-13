<template>
  <div class="page special">
    <!-- 知名商户 -->
    <div class="shop-wrap">
      <h2 class="title">知名商户</h2>
      <scroll-view class="shop-list" scroll-x>
        <view class="shop" 
          v-for="(shop, index) in shops" 
          :key="index" 
          @click="linkTo('shop', index)">
          <image :src="shop.logo"/>
          <span class="name">{{shop.name}}</span>
        </view>
      </scroll-view>
    </div>
    <!-- 特色活动 -->
    <div class="event-wrap">
      <h2 class="title">特色活动</h2>
      <ul class="event-list">
        <li class="event" v-for="(event, index) in events" :key="index" @click="linkTo('detail', index)">
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
  import {baseMixin} from '@/common/js/mixin'
  import {formatTime} from '@/common/js/format'

  export default {
    mixins: [baseMixin],
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
        const self = this

        wx.request({
          url: 'https://yunhe5.horsevision.cn/miniprogram/web/index.php?r=api/article/article-list',
          success(res){
            const {status, mes} = res.data

            if(status == 200){
              const {articleList, pageInfo} = mes

              self.events = articleList.map(({title, add_time}) => ({
                imgUrl: '/static/test/1.jpg',
                title,
                updatetime: formatTime(add_time, '-'),
              }))
            }
          },
        })
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import './special.styl'
</style>