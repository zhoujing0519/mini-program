<template>
  <div class="page event">
    <!-- 分类 -->
    <nav class="nav">
      <span class="item" 
        :class="{active: index === type}"
        v-for="(item, index) in navs" 
        :key="index" 
        @click="select(index)">{{item}}</span>
    </nav>
    <!-- 活动列表 -->
    <ul class="event-list">
      <li class="item" 
        v-for="(shop, index) in shops" 
        :key="index" 
        @click="linkTo('shop', shop.id)">
        <image :src="shop.imgUrl" />
        <div class="content">
          <h2 class="title">{{shop.title}}</h2>
          <div class="desc">
            <rich-text :nodes="shop.desc"></rich-text>
          </div>
          <div class="btn">查看详情</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {baseMixin} from '@/common/js/mixin'
  import {url_shop_list} from '@/api/urls'
  import {request} from '@/api/request'

  export default {
    mixins: [baseMixin],
    data(){
      return {
        navs: ['店铺信息', '优惠活动'],
        type: 0,
        list: {},
        shops: [],
      }
    },
    computed: {
      currentList(){
        return this.list[this.type]
      },
    },
    onLoad(){
      this.getShops()
      this.getList()
    },
    methods: {
      select(index){
        this.type = index
      },
      getList(){
        const {type} = this
        if(!this.list[type]) this.list[type] = []
        this.list[type] = [
          {
            imgUrl: '/static/test/1.jpg',
            title: '米店百人咖啡',
            desc: '缓慢的小资情调，优雅的浪漫情怀。坐拥恬静的悠闲时光，细数那些轻柔的慵懒。',
          },{
            imgUrl: '/static/test/1.jpg',
            title: '米店百人咖啡',
            desc: '缓慢的小资情调，优雅的浪漫情怀。坐拥恬静的悠闲时光，细数那些轻柔的慵懒。',
          },{
            imgUrl: '/static/test/1.jpg',
            title: '米店百人咖啡',
            desc: '缓慢的小资情调，优雅的浪漫情怀。坐拥恬静的悠闲时光，细数那些轻柔的慵懒。',
          },{
            imgUrl: '/static/test/1.jpg',
            title: '米店百人咖啡',
            desc: '缓慢的小资情调，优雅的浪漫情怀。坐拥恬静的悠闲时光，细数那些轻柔的慵懒。',
          },
        ]
      },
      // 获取商家列表
      getShops(){
        request(url_shop_list)
        .then(res => {
          const {status, mes} = res.data

          if(status == 200){
            const {shopsList} = mes

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
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import './event.styl'
</style>