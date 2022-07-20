import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import mavonEditor from 'mavon-editor' // markdown编辑器
import 'mavon-editor/dist/css/index.css'
import 'nprogress/nprogress.css' // progress bar style
import './styles/element-variables.scss' // 自定义主题色
import './styles/index.scss'
import fmtDateTime from './filter/time' // 导入过滤器
import borthdate from './filter/borth'
import VueSocketIo from 'vue-socket.io'
/*
导入疫情数据
overall：病毒研究情况以及全国疫情概览
provinceName：有数据条目的国家、省份、地区、直辖市列表
area：中国所有省份、地区或直辖市及世界其他国家的所有疫情信息变化的时间序列数据（精确到市）
news：所有与疫情有关的新闻信息，包含数据来源以及数据来源链接
rumors：与疫情有关的谣言以及丁香园的辟谣
*/
import overall from './api/overall'
Vue.prototype.$overall = overall

import provinceName from './api/provinceName'
Vue.prototype.$provinceName = provinceName

import area from './api/area'
Vue.prototype.$area = area

import news from './api/news'
Vue.prototype.$news = news

import rumors from './api/rumors'
Vue.prototype.$rumors = rumors


import './styles/face.css'
import './styles/face.js'
const G2 = require('@antv/g2')
Vue.prototype.$G2 = G2

Vue.filter('fmtDateTime', fmtDateTime)
Vue.filter('borthdate', borthdate)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
import {
  Button,
  Input,
  Icon,
  Badge,
  Dialog,
  Aside,
  Main,
  Header,
  Container,
  Upload,
  MessageBox,
  Notification
} from 'element-ui'
// use
Vue.use(mavonEditor)
const wesocket = {
  debug: false,
  connection: 'http://localhost:4001'
}

Vue.use(Icon)
Vue.use(Input)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Aside)
Vue.use(Badge)
Vue.use(Main)
Vue.use(Header)
Vue.use(Upload)
Vue.use(Container)
Vue.use(new VueSocketIo(wesocket))
Vue.config.productionTip = false
Vue.prototype.$notify = Notification
Vue.prototype.$alert = MessageBox.alert
// use
Vue.use(mavonEditor)

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
