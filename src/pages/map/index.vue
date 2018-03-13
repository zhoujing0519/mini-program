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
      <map
        style="width: 100%; height: 100%;"></map>
    </div>
    <!-- 商户 -->
    <div class="shop-wrap">
      <div class="total" @click="transform">
        <span>共有{{total}}个商户</span>
        <image src="/static/icons/icon-down.png"/>
      </div>
      <scroll-view class="shop-list" scroll-x>
        <view class="shop" v-for="(shop, index) in shops" :key="index">
          <image :src="shop.imgUrl" />
          <h2 class="name">{{shop.name}}</h2>
        </view>
      </scroll-view>
    </div>
  </div>
</template>

<script>
  import Gap from '@/components/gap'

  export default {
    data(){
      return {
        navs: [],
        shops: [],
        isFullscreen: false,
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