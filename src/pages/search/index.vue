<template>
  <div class="page search">
    <div class="search-wrap">
      <div class="search-input">
        <image mode="widthFix" class="icon-search" src="/static/icons/icon-search-2.png"/>
        <input class="input" placeholder="请输入商户名称关键字" auto-focus/>
        <image mode="widthFix" class="icon-clear" src="/static/icons/icon-clear.png" />
      </div>
      <navigator class="cancel" open-type="navigateBack">取消</navigator>
    </div>
    <div class="search-fixed">
      <ul class="search-list">
        <li class="item" v-for="(item, index) in searchList" :key="index">
          <image mode="widthFix" src="/static/icons/icon-pos-2.png"/>
          <span class="text">{{item}}</span>
        </li>
      </ul>
    </div>
    <div class="hot-wrap">
      <h2 class="title">热门搜索</h2>
      <ul class="hot-list">
        <li class="item" v-for="(item, index) in hots" :key="index" @click="checkDetail">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        hots: [],
        searchList: [],
      }
    },
    created(){
      this.getHots()
      this.getSearchList()
    },
    methods: {
      getHots(){
        this.hots = [
          '微信',
          '洗手间',
          '商场',
          '门店',
          '米家百人咖啡',
        ]
      },
      getSearchList(){
        this.searchList = [
          '微信',
          '娃哈哈'
        ]
      },
      checkDetail(){
        wx.navigateTo({
          url: '/pages/shop/shop?id=1'
        })
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import './search.styl'
</style>