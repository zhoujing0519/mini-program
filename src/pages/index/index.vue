<template>
  <div class="page index">
    <div class="banner-wrap">
      <!-- 轮播图 -->
      <swiper :indicator-dots="true" indicator-color="#000" indicator-active-color="#fff" :autoplay="true">
        <swiper-item v-for="(swiper, index) in sys.banners" :key="index">
          <image :src="swiper" />
        </swiper-item>
      </swiper>
      <!-- 导航 -->
      <nav class="nav">
        <a class="link" href="/pages/special/special">
          <div class="inner">
            <span>园区</span>
            <span>动态</span>
          </div>
        </a>
        <a class="link" href="/pages/map/map">
          <div class="inner">
            <span>街区</span>
            <span>导览</span>
          </div>
        </a>
      </nav>
    </div>
    <div class="introduction">
      <h1 class="title-wrap">
        <span class="cn" v-text="sys.nameCN"></span>
        <span class="en" v-text="sys.nameEN"></span>
      </h1>
      <div class="content">
        <rich-text :nodes="sys.introduce"></rich-text>
      </div>
    </div>
  </div>
</template>

<script>
  import {url_sys_info} from '@/api/urls'

  export default {
    data(){
      return {
        sys: {
          banners: [], // 轮播
          nameCN: '', // 中文
          nameEN: '', // 英文
          introduce: '', // 介绍
        },
      }
    },
    onLoad(){
      this.getData()
    },
    methods: {
      getData(){
        this.$request.get(url_sys_info)
        .then(res => {
          const {status, mes} = res.data

          if(status == 200){
            const {sysConfig} = mes
            const {albums, sys_name, sys_ename, introduce} = sysConfig

            this.sys.banners = albums
            this.sys.nameCN = sys_name
            this.sys.nameEN = sys_ename
            this.sys.introduce = introduce
          }
        })
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import './index.styl'
</style>
