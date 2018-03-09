import Vue from 'vue'
import App from './App'
import 'common/stylus/app.styl'

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
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '运河五号',
      navigationBarTextStyle: 'black'
    }
  }
}
