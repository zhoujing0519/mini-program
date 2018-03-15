// 使用Promise封装请求
export const request = (url, method = 'GET', data = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(res){
        resolve(res)
      },
      fail(err){
        reject(err)
      },
    })
  })
}