<template>
  <div class="page special">
    <!-- 知名商户 -->
    <div class="shop-wrap">
      <h2 class="title">知名商户</h2>
      <scroll-view class="shop-list" 
        scroll-x>
        <view class="shop" 
          v-for="(shop, index) in shops" 
          :key="index" 
          @click="linkTo('shop', shop.id)">
          <image :src="shop.logo"/>
          <span class="name">{{shop.name}}</span>
        </view>
      </scroll-view>
    </div>
    <!-- 特色活动 -->
    <div class="event-wrap">
      <h2 class="title">园区动态</h2>
      <scroll-view class="event-list"
        scroll-y
        :bindscrolltolower="loadMore">
        <view class="event"
          v-for="(event, index) in events" 
          :key="index" 
          @click="linkTo('detail', event.id)">
          <image :src="event.imgUrl"/>
          <div class="content">
            <h3 class="event-title">{{event.title}}</h3>
            <span class="updatetime">{{event.updatetime}}</span>
          </div>
        </view>
      </scroll-view>
    </div>
  </div>
</template>

<script>
  import {baseMixin} from '@/common/js/mixin'
  import {formatTime} from '@/common/js/format'
  import {url_article_list, url_shop_list} from '@/api/urls'
  import {setPreview} from '@/common/js/setPreview'

  export default {
    mixins: [baseMixin],
    data(){
      return {
        shops: [], // 商家
        events: [], // 活动
        currentPage: 1, // 活动当前页
        totalPage: 1, // 活动总页数
      }
    },
    onLoad(){
      this.getSpecialData()
    },
    methods: {
      // 获取页面数据
      getSpecialData(){
        this.getShops()
        this.getEvents()
      },
      // 获取商户
      getShops(){
        this.$request.get(`${url_shop_list}&flag=known`)
        .then(res => {
          const {status, mes} = res.data

          if(status == 200){
            const {shopsList} = mes

            this.shops = shopsList.map(({logo, shop_name, id}) => ({
              id,
              logo,
              name: shop_name,
            }))
          }
        })
        .catch(err => {
          
        })
      },
      // 获取活动
      getEvents(){
        this.$request.get(`${url_article_list}&catid=2`)
        .then(res => {
          const {status, mes} = res.data

          if(status == 200){
            const {articleList, pageInfo} = mes
            const {currPage, totalPage} = pageInfo

            this.currentPage = +currPage
            this.totalPage = +totalPage
            this.events = articleList.map(({title, add_time, article_id, thumb}) => ({
              id: article_id,
              imgUrl: setPreview(thumb),
              title,
              updatetime: formatTime(add_time, '-'),
            }))
          }
        })
        .catch(err => {
          
        })
      },
      // 加载更多
      loadMore(){
        this.currentPage++
        if(this.currentPage > this.totalPage) return

        this.showLoading()
        this.$request.get(`${url_article_list}&catid=2&page=${this.currentPage}`)
        .then(res => {
          const {status, mes} = res.data

          if(status == 200){
            const {articleList, pageInfo} = mes

            this.currentPage = +pageInfo.currPage
            let newArticles = articleList.map(({title, add_time, article_id, thumb}) => ({
              id: article_id,
              imgUrl: setPreview(thumb),
              title,
              updatetime: formatTime(add_time, '-'),
            }))
            setTimeout(() => {
              this.events.push(...newArticles)
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
  @import './special.styl'
</style>