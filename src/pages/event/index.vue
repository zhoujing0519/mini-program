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
        v-for="(item, index) in currentList" 
        :key="index" 
        @click="navigateTo(item.id)">
        <image :src="item.imgUrl" mode="aspectFill" />
        <div class="content">
          <h2 class="title">{{item.title}}</h2>
          <div class="desc">
            <rich-text :nodes="item.desc"></rich-text>
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

  export default {
    mixins: [baseMixin],
    data(){
      return {
        type: 0,
        shops: [],
        shopPage: 1,
        shopTotalPage: 1,
        articles: [],
        articlePage: 1,
        articleTotalPage: 1,
      }
    },
    computed: {
      // 当前列表
      currentList(){
        return this.type === 0 ? this.shops : this.articles
      },
      // 当前页码
      currentPage(){
        return this.type === 0 ? this.shopPage : this.articlePage
      },
      // 当前页码总数
      currentTotalPage(){
        return this.type === 0 ? this.shopTotalPage : this.articleTotalPage
      },
    },
    onLoad(){
      this.getShops()
      this.getArticles()
    },
    methods: {
      // 选择分类
      select(index){
        this.type = index
      },
      // 跳转到详情页
      navigateTo(id){
        let pathName = this.type === 0 ? 'shop' : 'detail'
        this.linkTo(pathName, id)
      },
      // 获取商家列表
      getShops(){
        this.$request.get(url_shop_list)
        .then(res => {
          const {status, mes} = res.data

          if(status == 200){
            const {shopsList, pageInfo} = mes
            const {currPage, totalPage} = pageInfo

            this.shopPage = +currPage
            this.shopTotalPage = +totalPage
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
        this.$request.get(`${url_article_list}&catid=1`)
        .then(res => {
          const {status, mes} = res.data

          if(status == 200){
            const {articleList, pageInfo} = mes
            const {currPage, totalPage} = pageInfo

            this.articlePage = +currPage
            this.articleTotalPage = +totalPage
            this.articles = articleList.map(({article_id, thumb, title, description}) => ({
              id: article_id,
              imgUrl: thumb,
              title,
              desc: description,
            }))
          }
        })
        .catch(err => {

        })
      },
      // 上拉加载更多
      loadMore(){
        let method = this.type === 0 ? 'shop' : 'article'
        this[`${method}LoadMore`]()
      },
      // 商家上拉加载
      shopLoadMore(){
        this.shopPage++
        if(this.currentPage > this.currentTotalPage) return

        this.showLoading()
        this.$request.get(`${url_shop_list}&page=${this.currentPage}`)
        .then(res => {
          const {status, mes} = res.data

          if(status == 200){
            const {shopsList, pageInfo} = mes

            this.shopPage = +pageInfo.currPage
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
      // 文章上拉加载
      articleLoadMore(){
        this.articlePage++
        if(this.currentPage > this.currentTotalPage) return

        this.showLoading()
        this.$request.get(`${url_article_list}&catid=1&page=${this.currentPage}`)
        .then(res => {
          const {status, mes} = res.data

          if(status == 200){
            const {articleList, pageInfo} = mes

            this.articlePage = +pageInfo.currPage
            let newArticles = articleList.map(({article_id, thumb, title, description}) => ({
              id: article_id,
              imgUrl: thumb,
              title,
              desc: description,
            }))
            setTimeout(() => {
              this.articles.push(...newArticles)
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