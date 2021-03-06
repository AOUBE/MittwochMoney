import App from './App'

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
import utilJs from '@/common/utils/util.js'

Vue.prototype.utilJs = utilJs;

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif