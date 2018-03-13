<template>
  <div class="page map">
    <!-- 导航栏 -->
    <div class="nav-wrap">
      <a class="search" href="/pages/search/search">
        <image src="/static/icons/icon-search.png"/>
      </a>
      <scroll-view class="nav-list" scroll-x>
        <view class="item" 
          v-for="(item, index) in navs" 
          :key="index" 
          :class="{active: index === 0}">
          <span class="text">{{item}}</span>
        </view>
      </scroll-view>
    </div>
    <!-- 地图 -->
    <div id="map-wrap" class="map-wrap">
      <map style="width: 100%; height: 100%;"
        :markers="markers"
        :longitude="119.936998"
        :latitude="31.788740"
        :scale="18"></map>
    </div>
    <!-- 商户 -->
    <div class="shop-wrap">
      <div class="total" @click="transform">
        <span>共有{{total}}个商户</span>
        <image src="/static/icons/icon-down.png"/>
      </div>
      <scroll-view class="shop-list" scroll-x>
        <view class="shop" v-for="(shop, index) in shops" :key="index" @click="linkTo('shop', index)">
          <image :src="shop.imgUrl" />
          <h2 class="name">{{shop.name}}</h2>
        </view>
      </scroll-view>
    </div>
  </div>
</template>

<script>
  import Gap from '@/components/gap'
  import {baseMixin} from '@/common/js/mixin'

  export default {
    mixins: [baseMixin],
    data(){
      return {
        navs: [],
        shops: [],
        isFullscreen: false,
        markers: [],
      }
    },
    computed: {
      total(){
        return this.shops.length
      },
    },
    created(){
      this.getNavs()
      this.getShops()
      this.getMarkers()
    },
    methods: {
      // 获取导航信息
      getNavs(){
        this.navs = [
          '文化艺术',
          '游乐游艺',
          '休闲小吃',
          '私人影院',
        ]
      },
      // 获取当前商户列表
      getShops(){
        this.shops = [
          {
            imgUrl: '/static/test/1.jpg',
            name: '米店百人咖啡'
          },{
            imgUrl: '/static/test/1.jpg',
            name: '米店百人咖啡'
          },{
            imgUrl: '/static/test/1.jpg',
            name: '米店百人咖啡'
          },{
            imgUrl: '/static/test/1.jpg',
            name: '米店百人咖啡'
          },
        ]
      },
      // 获取坐标点集合
      getMarkers(){
        this.markers = [
          {
            title: '尚婚',
            latitude: 31.787313,
            longitude: 119.935679,
            iconPath: '/static/icons/icon-pos-3.png',
            width: 24,
            height: 24,
          },{
            title: '空白格',
            latitude: 31.787308,
            longitude: 119.935684,
            iconPath: '/static/icons/icon-pos-3.png',
            width: 24,
            height: 24,
          },{
            title: '集合',
            latitude: 31.788426,
            longitude: 119.936339,
            iconPath: '/static/icons/icon-pos-3.png',
            width: 24,
            height: 24,
          },{
            title: '锅炉房',
            latitude: 31.788658,
            longitude: 119.936344,
            iconPath: '/static/icons/icon-pos-3.png',
            width: 24,
            height: 24,
          },{
            title: '园区所要资料-第壹章节',
            latitude: 31.788740,
            longitude: 119.936998,
            iconPath: '/static/icons/icon-pos-3.png',
            width: 24,
            height: 24,
          },{
            title: '正誉会',
            latitude: 31.789091,
            longitude: 119.937363,
            iconPath: '/static/icons/icon-pos-3.png',
            width: 24,
            height: 24,
          },{
            title: '恒源畅书坊',
            latitude: 31.788877,
            longitude: 119.937642,
            iconPath: '/static/icons/icon-pos-3.png',
            width: 24,
            height: 24,
          },
        ]
      },
      transform(){
        this.isFullscreen = !this.isFullscreen
      },
    },
    components: {
      Gap,
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import './map.styl'
</style>