import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

// 全局注册过滤器
// 全局注册过滤器
Vue.filter('relativeTime', (value) => {
  return dayjs(value).toNow()
})
