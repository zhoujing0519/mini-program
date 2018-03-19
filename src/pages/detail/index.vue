<template>
  <div class="page detail">
    <h1 class="title">{{article.title}}</h1>
    <p class="updatetime">时间：{{article.updatetime}}</p>
    <div class="content">
      <rich-text :nodes="article.content"></rich-text>
    </div>
  </div>
</template>

<script>
  import {url_article_detail} from '@/api/urls'
  import {formatTime} from '@/common/js/format'
  import {baseMixin} from '@/common/js/mixin'

  export default {
    mixins: [baseMixin],
    data(){
      return {
        article: {}, // 文章信息
      }
    },
    onLoad(){
      const {id} = this.$root.$mp.query
      if(!id){
        this.linkTo('index')
        return
      }
      this.getArticleDetail(id)
    },
    methods: {
      // 获取文章详情
      getArticleDetail(id){
        this.$request.get(`${url_article_detail}&id=${id}`)
        .then(res => {
          const {status, mes} = res.data

          if(status == 200){
            const {article} = mes

            this.article = (({title, add_time, content}) => ({
              title,
              updatetime: formatTime(add_time, '-'),
              content,
            }))(article)
          }
        })
        .catch(err => {

        })
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import './detail.styl'
</style>