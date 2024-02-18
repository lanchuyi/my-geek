import axios from 'axios'
import router from '@/router'
// import { getToken, delToken } from '@/utils/storage.js'
import store from '@/store'
import to from 'await-to-js'

// 新axios实例
const instance = axios.create({
  baseURL: 'http://geek.itheima.net/',
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // const token = getToken()
  const token = store.state.token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, err => Promise.reject(err))

// 响应拦截器
instance.interceptors.response.use(res => res, err => {
  if (err.response && err.response.status === 401) {
    // token失效
    // delToken()
    store.commit('setToken', null)
    router.push('/login?returnUrl=' + encodeURIComponent(router.currentRoute.fullPath))
  }
  return Promise.reject(err)
})

// 导出一个新axios实例调用接口的函数，返回值promise
export default ({ url, method = 'get', params, data, headers }) => {
  return to(instance({ url, method, params, data, headers }))
}
