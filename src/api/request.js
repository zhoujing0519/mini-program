// 使用Promise封装请求
export const request = (url, method = 'GET') => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      success(res){
        resolve(res)
      },
      fail(err){
        reject(err)
      },
    })
  })
}