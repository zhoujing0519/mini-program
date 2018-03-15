<template>
  <div class="page event">
    <!-- 分类 -->
    <nav class="nav">
      <span class="item" 
        :class="{active: index === type}"
        v-for="(item, index) in ['店铺信息', '优惠活动']" 
        :key="index" 
        @click="select(index)">{{item}}</span>
    </nav>
    <!-- 活动列表 -->
    <scroll-view 
      class="event-list"
      scroll-y
      @scrolltolower="loadMore">
      <view class="item" 
        v-for="(shop, index) in shops" 
        :key="index" 
        @click="linkTo('shop', shop.id)">
        <image :src="shop.imgUrl" mode="aspectFill" />
        <div class="content">
          <h2 class="title">{{shop.title}}</h2>
          <div class="desc">
            <rich-text :nodes="shop.desc"></rich-text>
          </div>
          <div class="btn">查看详情</div>
        </div>
      </view>
    </scroll-view>
  </div>
</template>

<script>
  import {baseMixin} from '@/common/js/mixin'
  import {url_shop_list, url_article_list} from '@/api/urls'
  import {request} from '@/api/request'

  export default {
    mixins: [baseMixin],
    data(){
      return {
        type: 0,
        list: {},
        shops: [],
        currentPage: 1,
        totalPage: '',
      }
    },
    computed: {
      currentList(){
        return this.list[this.type]
      },
    },
    onLoad(){
      this.getList()
    },
    methods: {
      select(index){
        this.type = index
      },
      // 获取列表
      getList(){
        let method = this.type === 0 ? 'getShops' : 'getArticle'
        this[method]()
      },
      // 获取商家列表
      getShops(){
        request(url_shop_list)
        .then(res => {
          const {status, mes} = res.data

          if(status == 200){
            const {shopsList, pageInfo} = mes
            const {currPage, totalPage} = pageInfo

            this.currentPage = +currPage
            this.totalPage = +totalPage
            this.shops = shopsList.map(({id, preview, shop_name, introduce}) => ({
              id,
              imgUrl: preview,
              title: shop_name,
              desc: introduce,
            }))
          }
        })
        .catch(err => {

        })
      },
      // 获取文章列表
      getArticles(){
        request(`${url_article_list}&catid=1`)
        .then(res => {
          const {status, mes} = res.data

          if(status == 200){
            const {shopsList, pageInfo} = mes
            const {currPage, totalPage} = pageInfo

            this.currentPage = +currPage
            this.totalPage = +totalPage
            this.shops = shopsList.map(({id, preview, shop_name, introduce}) => ({
              id,
              imgUrl: preview,
              title: shop_name,
              desc: introduce,
            }))
          }
        })
        .catch(err => {

        })
      },
      // 上拉加载更多
      loadMore(){
        this.currentPage++
        if(this.currentPage > this.totalPage) return

        this.showLoading()
        request(`${url_shop_list}&page=${this.currentPage}`)
        .then(res => {
          const {status, mes} = res.data

          if(status == 200){
            const {shopsList, pageInfo} = mes

            this.currentPage = +pageInfo.currPage
            let newShops = shopsList.map(({id, preview, shop_name, introduce}) => ({
              id,
              imgUrl: preview,
              title: shop_name,
              desc: introduce,
            }))
            setTimeout(() => {
              this.shops.push(...newShops)
              this.hideLoading()
            }, 1000)
          }
        })
        .catch(err => {

        })
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import './event.styl'
</style>