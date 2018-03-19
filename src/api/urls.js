const url_base = 'https://yunhe5.horsevision.cn/miniprogram/web/index.php?r=api'
const connect = (modules, method) => `${url_base}/${modules}/${method}`

// 首页
export const url_sys_info = connect('sys', 'info')
// 文章：列表
export const url_article_list = connect('article', 'article-list')
// 文章：详情
export const url_article_detail = connect('article', 'article-detail')
// 商家：分类
export const url_shop_category = connect('shops', 'shop-category')
// 商家：列表
export const url_shop_list = connect('shops', 'shop-list')
// 商家：详情
export const url_shop_detail = connect('shops', 'shop-detail')
// 商家：添加评论
export const url_shop_add_comment = connect('shops', 'add-comment')
// 商家：评论列表
export const url_shop_comment_list = connect('shops', 'comment-list')
// 商家：搜索
export const url_shop_search = connect('shops', 'search-shop-list')
// 系统：热搜
export const url_hot_search = connect('sys', 'hot-search')