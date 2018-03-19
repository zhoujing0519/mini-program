<template>
  <div class="page shop">
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" indicator-color="#000" indicator-active-color="#fff">
      <swiper-item v-for="(swiper, index) in shop.albums" :key="index">
        <image mode="aspectFill" :src="swiper" />
      </swiper-item>
    </swiper>
    <!-- 商家介绍 -->
    <div class="shop-wrap">
      <h1 class="shop-name">{{shop.shop_name}}</h1>
      <ul class="contact-list">
        <li class="item" @click="makePhoneCall">
          <image class="icon" src="/static/icons/icon-tel.png" />
          <span class="desc">{{shop.shop_tel || '暂无电话'}}</span>
          <image class="icon" src="/static/icons/icon-arr.png" />
        </li>
        <li class="item" @click="openLocation">
          <image class="icon" src="/static/icons/icon-pos.png" />
          <span class="desc">{{shop.shop_add || '默认地址'}}</span>
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
      <ul class="msg-list" v-if="comments.length > 0">
        <li class="item" v-for="(item, index) in comments" :key="index">
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
      <div class="empty" v-else>
        暂无评论
      </div>
    </div>
    <div class="more" v-if="comments.length > 0" @click="getCommentMore">查看更多</div>
    <gap></gap>
    <!-- 留言 -->
    <div class="leave-msg">
      <image src="/static/icons/icon-edt.png"/>
      <input 
        class="text" 
        placeholder="写下你对这里的看法"
        v-model="commentContent"
        @confirm="comment" />
    </div>
  </div>
</template>

<script>
  import gap from '@/components/gap'
  import {formatTime} from '@/common/js/format'
  import {url_shop_detail, url_shop_comment_list, url_shop_add_comment} from '@/api/urls'
  import {baseMixin} from '@/common/js/mixin'

  export default {
    mixins: [baseMixin],
    data(){
      return {
        shop: {}, // 商家信息
        comments: [], // 评论列表
        currentPage: 1, // 评论当前页
        totalPage: 1, // 评论总页数
        userInfo: {}, // 用户信息
        commentContent: '', // 评论内容
      }
    },
    onLoad(){
      const {id} = this.$root.$mp.query
      
      this.getDetail(id)
      this.getUserInfo()
    },
    methods: {
      // 获取详情数据
      getDetail(id){
        wx.showLoading({
          title: '加载中...'
        })
        this.$request.get(`${url_shop_detail}&id=${id}`)
        .then(res => {
          const {status, mes} = res.data

          if(status == 200){
            const {shop} = mes

            this.shop = Object.assign({id}, shop)
            return Promise.resolve()
          }
        })
        .then(() => {
          this.getComment(id)
        })
      },
      // 获取评论数据
      getComment(id){
        this.$request.get(`${url_shop_comment_list}&shopid=${id}`)
        .then(res => {
          const {status, mes} = res.data

          if(status == 200){
            const {commentList, pageInfo} = mes
            const {currPage, totalPage} = pageInfo

            this.currentPage = currPage
            this.totalPage = totalPage
            this.comments = commentList.map(({wechat_headimgurl, wechat_nickname, add_time, content}) => ({
              avatar: wechat_headimgurl || '/static/avatar/male.png',
              username: wechat_nickname || '匿名用户',
              msg: content,
              updatetime: add_time,
            }))
            setTimeout(() => {
              this.hideLoading()
            }, 500)
          }
        })
        .catch(err => {

        })
      },
      // 加载更多评论
      getCommentMore(){
        let {shop, currentPage, totalPage} = this
        let {id} = shop
        currentPage++
        if(currentPage > totalPage) return

        this.showLoading()
        this.$request.get(`${url_shop_comment_list}&shopid=${id}&page=${currentPage}`)
        .then(res => {
          const {status, mes} = res.data

          if(status == 200){
            const {commentList, pageInfo} = mes
            const {currPage} = pageInfo

            this.currentPage = currPage
            let newComments = commentList.map(({wechat_headimgurl, wechat_nickname, add_time, content}) => ({
              avatar: wechat_headimgurl || '/static/avatar/male.png',
              username: wechat_nickname || '匿名用户',
              msg: content,
              updatetime: add_time,
            }))
            setTimeout(() => {
              this.comments.push(...newComments)
              this.hideLoading()
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
          scale: 40,
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
      // 发布评论
      comment(){
        const {commentContent} = this
        if(!commentContent){
          wx.showModal({
            title: '系统信息',
            content: '评论内容不能为空',
            showCancel: false,
          })
          return
        }

        const {avatarUrl, nickName} = this.userInfo
        const {id} = this.$root.$mp.query

        this.$request.post({
          url: url_shop_add_comment, 
          data: {
            shop_id: id,
            wechat_headimgurl: avatarUrl,
            wechat_nickname: nickName,
            content: commentContent,
          }
        })
        .then(res => {
          const {status, mes} = res.data

          if(status == 200){
            this.comments.unshift({
              avatar: avatarUrl,
              username: nickName,
              msg: commentContent,
              updatetime: formatTime(+new Date, '-'),
            })
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
        .catch(err => {

        })
      },
    },
    components: {
      gap,
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import './shop.styl'
</style>