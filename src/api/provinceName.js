import { get } from '@/utils/request'

const provinceName = {
    getDataInfo(params) {
       return get('https://lab.isaaclin.cn/nCoV/api/provinceName',params)
    }
}

export default provinceName;