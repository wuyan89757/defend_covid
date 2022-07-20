import { get } from '@/utils/request'

const overall = {
    getDataInfo(params) {
       return get('https://lab.isaaclin.cn/nCoV/api/overall',params)
    }
}

export default overall;