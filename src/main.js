import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vant from 'vant'
import 'vant/lib/index.css'

Vue.config.productionTip = false
Vue.use(vant)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
