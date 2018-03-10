<template>
  <div class="page event">
    <!-- 分类 -->
    <nav class="nav">
      <a class="item active" href="javascript:;">店铺信息</a>
      <a class="item" href="javascript:;">优惠活动</a>
    </nav>
    <!-- 活动列表 -->
    <ul class="event-list">
      <li class="item" v-for="(item, index) in list" :key="index">
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
  export default {
    data(){
      return {
        list: [],
      }
    },
    created(){
      this.getList()
    },
    methods: {
      getList(){
        this.list = [
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