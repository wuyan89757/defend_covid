import { get } from '@/utils/request'

const rumors = {
    getDataInfo(params) {
       return get('https://lab.isaaclin.cn/nCoV/api/rumors',params)
    }
}

export default rumors;