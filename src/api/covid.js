// import request from '@/utils/request'
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
    data
  })
}
export function getArea(data) {
  return request({
    url: 'api/area',
    method: 'get',
    data
  })
}
export function getOverall(data) {
  return request({
    url: '/api/overall',
    // url: '/nCoV/api/area',
    method: 'get',
    data
  })
}
export function getProvinceName(data) {
  return request({
    url: '/api/provinceName',
    // url: '/nCoV/api/area',
    method: 'get',
    data
  })
}
export function getRumors(data) {
  return request({
    url: '/api/rumors',
    method: 'get',
    data
  })
}
