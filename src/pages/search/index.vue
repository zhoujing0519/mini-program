<template>
  <div class="page search">
    <div class="search-wrap">
      <div class="search-input">
        <image mode="widthFix" class="icon-search" src="/static/icons/icon-search-2.png"/>
        <input v-model="query" class="input" placeholder="请输入商户名称关键字" auto-focus/>
        <image mode="widthFix" class="icon-clear" src="/static/icons/icon-clear.png" @click="clear" />
      </div>
      <navigator class="cancel" open-type="navigateBack">取消</navigator>
    </div>
    <div class="search-fixed">
      <ul class="search-list">
        <li class="item" v-for="(item, index) in searchList" :key="index" @click="checkDetail(item.id)">
          <image mode="widthFix" src="/static/icons/icon-pos-2.png"/>
          <span class="text">{{item.shop_name}}</span>
        </li>
      </ul>
    </div>
    <div class="hot-wrap">
      <h2 class="title">热门搜索</h2>
      <ul class="hot-list">
        <li class="item" v-for="(item, index) in hots" :key="index" @click="setQuery(item)">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {url_shop_search, url_hot_search} from '@/api/urls'
  import {debounce} from '@/common/js/util'

  export default {
    data(){
      return {
        query: '',
        hots: [], // 热搜
        searchList: [], // 搜索列表
      }
    },
    onLoad(){
      this.getHots()
    },
    methods: {
      // 查询
      queryShop(){
        if(!this.query){
          this.searchList = []
          return
        }
        this.$request.post({
          url: url_shop_search,
          data: {
            shopname: this.query
          },
        })
        .then(res => {
          const {status, mes} = res.data

          if(status == 200){
            const {shopsList} = mes
            this.searchList = shopsList
          }
        })
      },
      // 清空
      clear(){
        this.query = ''
      },
      // 将热搜填入输入框
      setQuery(query){
        this.query = query
      },
      // 获取热搜
      getHots(){
        this.$request.get(url_hot_search)
        .then(res => {
          const {status, mes} = res.data

          if(status == 200){
            const {hot_search} = mes.sysConfig
            this.hots = hot_search
          }
        })
      },
      // 查看详情
      checkDetail(id){
        wx.navigateTo({
          url: `/pages/shop/shop?id=${id}`
        })
      },
    },
    watch: {
      query(newQuery){
        debounce(newQuery => {
          this.queryShop()
        }, 200)()
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import './search.styl'
</style>