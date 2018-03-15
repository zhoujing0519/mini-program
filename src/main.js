import Vue from 'vue'
import App from './App'
import 'common/stylus/app.styl'
import {request} from '@/api/request'

Vue.prototype.$request = request

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: [], // Will be filled in webpack
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#591919',
      navigationBarTitleText: '运河五号',
      navigationBarTextStyle: '#fff'
    }
  }
}
