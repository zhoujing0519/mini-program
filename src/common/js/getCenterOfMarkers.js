// 获取标记点的中心
export const getCenterOfMarkers = markers => {
  let longitudes = [], latitudes = []
  for(let {longitude, latitude} of markers){
    longitudes.push(longitude)
    latitudes.push(latitude)
  }
  
  let minLongitude, maxLongitude, minLatitude, maxLatitude
  minLatitude = Math.min(...latitudes)
  maxLatitude = Math.max(...latitudes)
  minLongitude = Math.min(...longitudes)
  maxLongitude = Math.max(...longitudes)

  let center_latitude, center_longitude
  center_latitude = +((maxLatitude + minLatitude) / 2).toFixed(6)
  center_longitude = +((maxLongitude + minLongitude) / 2).toFixed(6)

  return {
    latitude: center_latitude,
    longitude: center_longitude,
  }
}