import Vue from 'vue'
import VueRouter from 'vue-router'
// import { getToken } from '@/utils/storage.js'
import store from '@/store'
Vue.use(VueRouter)

// 路由懒加载方式
const Tabbar = () => import('@/components/app-tabbar.vue')
const Home = () => import('@/views/home')
const Question = () => import('@/views/question')
const Video = () => import('@/views/video')
const User = () => import('@/views/user')
const Article = () => import('@/views/article')
const Login = () => import('@/views/login')

const routes = [
  // 路由规则
  { path: '/', components: { default: Home, tabbar: Tabbar } },
  { path: '/question', components: { default: Question, tabbar: Tabbar } },
  { path: '/video', components: { default: Video, tabbar: Tabbar } },
  { path: '/user', components: { default: User, tabbar: Tabbar } },
  { path: '/article', component: Article },
  { path: '/login', component: Login }
]

const router = new VueRouter({
  routes
})
// 导航守卫
router.beforeEach((to, from, next) => {
  // const token = getToken()
  const token = store.state.token
  // 没登录并且访问/user下的路由
  if (!token && to.path.startsWith('/user')) {
    return next('/login?returnUrl=' + encodeURIComponent(from.fullPath))
  }
  // 其他情况放行
  next()
})

export default router
