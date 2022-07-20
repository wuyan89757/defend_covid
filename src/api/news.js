import { get } from '@/utils/request'

const news = {
    getDataInfo(params) {
       return get('https://lab.isaaclin.cn/nCoV/api/news',params)
    }
}

export default news;