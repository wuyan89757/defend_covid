import request from 'axios'

// export function test1(data) {
//   return request({
//     url: 'dev-api/test1',
//     method: 'post',
//     data
//   })
// }
export function getNews(data) {
  return request({
    url: '/api/news',
    method: 'get',
    params: { ...data } //扩展运算符展开data
  })
}
export function getArea(data) {
  return request({
    url: 'api/area',
    method: 'get',
    params: data
  })
}
export function getOverall(data) {
  return request({
    url: '/api/overall',
    method: 'get',
    data
  })
}
export function getProvinceName(data) {
  return request({
    url: '/api/provinceName',
    method: 'get',
    data
  })
}
export function getRumors(data) {
  return request({
    url: '/api/rumors',
    method: 'get',
    params: { ...data } //扩展运算符展开data
  })
}
