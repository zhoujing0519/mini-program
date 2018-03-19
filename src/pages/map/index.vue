<template>
  <div class="page map">
    <!-- 导航栏 -->
    <div class="nav-wrap">
      <!-- <a class="search" href="/pages/search/search">
        <image src="/static/icons/icon-search.png"/>
      </a> -->
      <scroll-view 
        class="nav-list" 
        scroll-x
        :scroll-with-animation="true"
        :scroll-into-view="categoryId">
        <view class="item" 
          v-for="(item, index) in categories" 
          :key="index"
          :id="item.categoryId"
          @click="changeCategory(item)"
          :class="{active: item.id === currentCategory}">
          <span class="text">{{item.name}}</span>
        </view>
      </scroll-view>
    </div>
    <!-- 地图 -->
    <div id="map-wrap" class="map-wrap">
      <map style="width: 100%; height: 100%;"
        :markers="shops"
        :include-points="shops"
        @markertap="selectMarker"
        :scale="30"></map>
    </div>
    <!-- 商户 -->
    <div class="shop-wrap">
      <div class="total">
        <span>共有{{total}}个商户</span>
        <!-- <image src="/static/icons/icon-down.png"/> -->
      </div>
      <scroll-view 
        class="shop-list" 
        scroll-x
        :scroll-with-animation="true"
        :scroll-into-view="markerId">
        <view class="shop" 
          v-for="(shop, index) in shops" 
          :key="index"
          :id="shop.id"
          :class="{active: shop.id === markerId}"
          @click="linkTo('shop', shop.shopId)">
          <image :src="shop.imgUrl" mode="scaleToFill" />
          <h2 class="name">{{shop.title}}</h2>
        </view>
      </scroll-view>
    </div>
  </div>
</template>

<script>
  import {baseMixin} from '@/common/js/mixin'
  import {marker} from '@/common/js/config'
  import {shops} from './shops'
  import {url_shop_category, url_shop_list} from '@/api/urls'
  import {setPreview} from '@/common/js/setPreview'

  export default {
    mixins: [baseMixin],
    data(){
      return {
        categories: [], // 分类
        currentCategory: '', // 当前分类
        shops: [], // 商家
        markerId: '', // 用于标记的ID（不能使用纯数字的ID，格式化为shop-[id]这种格式）
        categoryId: '', // 用于导航的ID（不能使用纯数字的ID，格式化为category-[id]这种格式）
      }
    },
    computed: {
      total(){
        return this.shops.length
      },
    },
    onLoad(){
      this.getCategories()
    },
    methods: {
      // 获取导航信息
      getCategories(){
        this.showLoading()
        this.$request.get(url_shop_category)
        .then(res => {
          const {status, mes} = res.data
          
          if(status == 200){
            const {categoryList} = mes

            this.categories = categoryList.map(({cat_id, cat_name}) => ({
              id: cat_id,
              name: cat_name,
              categoryId: `category-${cat_id}`,
            }))
            if(!this.currentCategory){
              this.currentCategory = this.categories[0].id
              this.categoryId = this.categories[0].categoryId
            }
            return Promise.resolve(this.currentCategory)
          }
        })
        .then(categoryId => {
          this.getShops(categoryId)
        })
        .catch(err => {

        })
      },
      // 切换分类
      changeCategory(category){
        this.currentCategory = category.id
        this.categoryId = category.categoryId
        this.showLoading()
        this.getShops(this.currentCategory)
      },
      // 获取当前商户列表
      getShops(categoryId){
        this.markerId = null // 清空上次标记点ID

        this.$request.get(`${url_shop_list}&catid=${categoryId}`)
        .then(res => {
          const {status, mes} = res.data

          if(status == 200){
            const {shopsList} = mes

            this.shops = shopsList.map(shop => {
              const {id, shop_name, preview} = shop
              shop.shopId = id
              shop.id = `shop-${id}`
              shop.imgUrl = setPreview(preview)
              shop.title = shop_name

              return Object.assign({}, shop, marker)
            })
            this.hideLoading()
          }
        })
      },
      // 选择标记点
      selectMarker(map){
        const {mp} = map
        const {markerId} = mp

        // 遍历商家
        // 商家ID === 标记点ID || 上次的标记点ID === 商家ID
        // 切换标记图标
        for(let [index, {id}] of this.shops.entries()){
          if(id === markerId || (this.markerId && id === this.markerId)){
            this.shops[index].iconPathToggle()
          }
        }
        // 将本次标记ID记录下来
        this.markerId = markerId
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import './map.styl'
</style>