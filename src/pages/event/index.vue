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
      <li class="item" v-for="(item, index) in currentList" :key="index" @click="linkTo('shop', index)">
        <image :src="item.imgUrl" />
        <div class="content">
          <h2 class="title">{{item.title}}</h2>
          <div class="desc">{{item.desc}}</div>
          <div class="btn">查看详情</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {baseMixin} from '@/common/js/mixin'

  export default {
    mixins: [baseMixin],
    data(){
      return {
        navs: ['店铺信息', '优惠活动'],
        type: 0,
        list: {},
      }
    },
    computed: {
      currentList(){
        return this.list[this.type]
      },
    },
    created(){
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
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import './event.styl'
</style>