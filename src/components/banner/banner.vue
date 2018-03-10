<template>
  <div class="banner">
    <swiper :indicator-dots="true" indicator-color="#000" indicator-active-color="#fff">
      <swiper-item v-for="(swiper, index) in data" :key="index">
        <image :src="swiper"/>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Array,
        default(){
          return []
        }
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .banner
    position: relative
    swiper
      width: 100%
      height: 0
      padding-top: 53%
      swiper-item
        image
          width: 100%
          height: 100%
</style>