// 为不足10位的数字左侧添0
function padding(number){
  return number > 10 ? number : `0${number}`
}

// 格式化时间戳
export const formatTime = (timeStamp, pattern) => {
  let date, year, month, day
  // 转换为有毫秒数的格式
  timeStamp = String(timeStamp) // 需要将数字转化为字符串，才能获取length
  const {length} = timeStamp // unix时间戳只有10位，默认13位（包含毫秒数）
  timeStamp = length > 10 ? timeStamp : timeStamp * 1000

  // 获取时间、年、月、日
  date = new Date(+timeStamp) // 日期对象不接受字符串，需要转化为数字
  year = date.getFullYear()
  month = padding(date.getMonth() + 1)
  day = padding(date.getDate())

  // 返回按指定模式连接的年月日
  return [year, month, day].join(pattern)
}

// 格式化图片
export const formatImage = str => {
  str = str.replace(/<img/gi, '<img style="max-width: 100%"')
  str = str.replace(/src=\"\./, 'src="https://yunhe5.horsevision.cn/miniprogram/web')

  return str
}