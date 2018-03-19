// 基础
export const baseMixin = {
  methods: {
    // 链接跳转
    linkTo(path, id){
      wx.navigateTo({
        url: `/pages/${path}/${path}?id=${id}`
      })
    },
    // 显示loading
    showLoading(title = '加载中...'){
      wx.showLoading({
        title,
      })
    },
    // 隐藏loading
    hideLoading(){
      wx.hideLoading()
    },
  },
}