// 使用Promise封装请求
export const request = {
  get(url){
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        success(res){ resolve(res) },
        fail(err){ reject(err) },
      })
    })
  },
  post({url, data}){
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        method: 'POST',
        data,
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success(res){ resolve(res) },
        fail(err){ reject(err) },
      })
    })
  },
}