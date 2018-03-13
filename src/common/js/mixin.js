// 基础
export const baseMixin = {
  methods: {
    linkTo(path, id){
      wx.navigateTo({
        url: `/pages/${path}/${path}?id=${id}`
      })
    },
  },
}