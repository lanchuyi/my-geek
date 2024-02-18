import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, delToken } from '@/utils/storage.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: getToken()
  },
  mutations: {
    setToken (state, newToken) {
      state.token = newToken
      // 如果设置的是一个无效的token，那么就直接将本地存储删掉
      if (!newToken) delToken()
      else setToken(newToken)
    }
  }
})

export default store
