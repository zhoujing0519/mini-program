// 获取标记点的中心
export const getCenterOfMarkers = markers => {
  let longitudes = [], // 经度
      latitudes = [] // 维度
  
  // 遍历标记数组，按经纬度进行分类
  for(let {longitude, latitude} of markers){
    longitudes.push(longitude)
    latitudes.push(latitude)
  }
  
  // 获取经纬度数组中的最大与最小值
  let minLongitude, maxLongitude, minLatitude, maxLatitude
  minLatitude = Math.min(...latitudes)
  maxLatitude = Math.max(...latitudes)
  minLongitude = Math.min(...longitudes)
  maxLongitude = Math.max(...longitudes)

  // 计算中心经纬度（经纬度保留小数点后6位）
  let center_latitude, center_longitude
  center_latitude = +((maxLatitude + minLatitude) / 2).toFixed(6)
  center_longitude = +((maxLongitude + minLongitude) / 2).toFixed(6)

  // 返回中心经纬度
  return {
    latitude: center_latitude,
    longitude: center_longitude,
  }
}