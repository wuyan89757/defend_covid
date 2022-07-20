import request from '@/utils/request'

export function getNews(data) {
  console.log('getNews')
  return request({
    url: 'https://lab.isaaclin.cn/nCoV/api/news',
    method: 'get',
    data
  })
}
