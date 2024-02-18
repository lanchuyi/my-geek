import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from 'vant'
import 'vant/lib/index.css'
import '@/filter'
import '@/assets/styles/index.less'
import '@/directive'

Vue.config.productionTip = false
Vue.use(vant)
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
