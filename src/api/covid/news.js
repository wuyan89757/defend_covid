import { get } from '@/utils/request'

const getNews = {
  getDataInfo(params) {
    return get('https://lab.isaaclin.cn/nCoV/api/news', params)
  }
}

export default getNews
