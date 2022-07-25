import request from 'axios'
import Axios from '@/utils/request-api'
// export function test1(data) {
//   return request({
//     url: 'dev-api/test1',
//     method: 'post',
//     data
//   })
// }
export function getNews(data) {
  return Axios.request({
    url: '/api/news',
    method: 'get',
    params: { ...data } // 扩展运算符展开data
  })
}
export function getArea(params) {
  return Axios.request({
    url: '/api/area',
    method: 'get',
    params
  })
}
export function getOverall(data) {
  return Axios.request({
    url: '/api/overall',
    method: 'get',
    data
  })
}
export function getProvinceName(data) {
  return Axios.request({
    url: '/api/provinceName',
    method: 'get',
    data
  })
}
export function getRumors(data) {
  return Axios.request({
    url: '/api/rumors',
    method: 'get',
    params: { ...data } // 扩展运算符展开data
  })
}
