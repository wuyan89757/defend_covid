import { get } from '@/utils/request'

const area = {
    getDataInfo(params) {
       return get('https://lab.isaaclin.cn/nCoV/api/area',params)
    }
}

export default area;