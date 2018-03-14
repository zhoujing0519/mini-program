<template>
  <div class="page shop">
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" indicator-color="#000" indicator-active-color="#fff">
      <swiper-item v-for="(swiper, index) in shop.albums" :key="index">
        <image :src="swiper" />
      </swiper-item>
    </swiper>
    <!-- 商家介绍 -->
    <div class="shop-wrap">
      <h1 class="shop-name">{{shop.shop_name}}</h1>
      <ul class="contact-list">
        <li class="item" @click="makePhoneCall">
          <image class="icon" src="/static/icons/icon-tel.png" />
          <span class="desc">{{shop.shop_tel}}</span>
          <image class="icon" src="/static/icons/icon-arr.png" />
        </li>
        <li class="item" @click="openLocation">
          <image class="icon" src="/static/icons/icon-pos.png" />
          <span class="desc">{{shop.shop_add}}</span>
          <image class="icon" src="/static/icons/icon-arr.png" />
        </li>
      </ul>
      <div class="shop-intro">
        <h2 class="title">商户介绍</h2>
        <div class="desc">
          <rich-text :nodes="shop.introduce"></rich-text>
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
    <!-- <div class="more">查看更多</div> -->
    <!-- <gap></gap> -->
    <!-- 留言 -->
    <!-- <div class="leave-msg">
      <image src="/static/icons/icon-edt.png"/>
      <span class="text">写下你对这里的看法</span>
    </div> -->
  </div>
</template>

<script>
  import banner from '@/components/banner'
  import gap from '@/components/gap'
  import {url_shop_detail, url_shop_comment_list} from '@/api/urls'
  import {request} from '@/api/request'

  export default {
    data(){
      return {
        shop: {},
        msgs: [],
      }
    },
    onLoad(){
      const {id} = this.$root.$mp.query
      this.getDetail(id)
    },
    methods: {
      // 获取详情数据
      getDetail(id){
        wx.showLoading({
          title: '加载中...'
        })
        request(`${url_shop_detail}&id=${id}`)
        .then(res => {
          const {status, mes} = res.data

          if(status == 200){
            const {shop} = mes

            this.shop = shop
            return Promise.resolve()
          }
        })
        .then(() => {
          this.getComment(id)
        })
      },
      // 获取评论数据
      getComment(id){
        request(`${url_shop_comment_list}&shopid=${id}`)
        .then(res => {
          const {status, mes} = res.data

          if(status == 200){
            const {commentList} = mes

            this.msgs = commentList.map(({wechat_headimgurl, wechat_nickname, add_time, content}) => ({
              avatar: wechat_headimgurl || '/static/avatar/male.png',
              username: wechat_nickname || '匿名用户',
              msg: content,
              updatetime: add_time,
            }))
            setTimeout(() => {
              wx.hideLoading()
            }, 500)
          }
        })
        .catch(err => {

        })
      },
      // 拨打电话
      makePhoneCall(){
        if(!this.shop.shop_tel) return
        let phoneNumber = this.shop.shop_tel.split('/')[0]

        wx.makePhoneCall({
          phoneNumber,
        })
      },
      // 获取商家位置
      openLocation(){
        wx.openLocation({
          latitude: +this.shop.latitude,
          longitude: +this.shop.longitude,
        })
      },
      // 获取用户信息
      getUserInfo(){
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