import Axios from '@/utils/request-api'

export function getMap() {
  return Axios.request({
    url: 'http://localhost:9528/json/china.json',
    method: 'get'
    // params: { ...data } // 扩展运算符展开dataW
  })
}
export function getNews(data) {
  return Axios.request({
    url: '/api/news',
    method: 'get',
    params: { ...data } // 扩展运算符展开dataW
  })
}
export function getArea(data) {
  return Axios.request({
    url: '/api/area',
    method: 'get',
    params: { ...data }
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
