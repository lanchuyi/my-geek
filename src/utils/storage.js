const KEY = 'geek-h5-token'

// 直接用按需导出，可以导出多个

// 设置
export const setToken = (newToken) => {
  localStorage.setItem(KEY, newToken)
}

// 获取
export const getToken = () => {
  return localStorage.getItem(KEY)
}

// 删除
export const delToken = () => {
  localStorage.removeItem(KEY)
}
