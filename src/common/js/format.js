function padding(number){
  return number > 10 ? number : `0${number}`
}

// 格式化时间戳
export const formatTime = (timeStamp, pattern) => {
  let date, year, month, day
  // 转换为有毫秒数的格式
  timeStamp *= 1000

  date = new Date(timeStamp)
  year = date.getFullYear()
  month = padding(date.getMonth() + 1)
  day = padding(date.getDate())

  return [year, month, day].join(pattern)
}