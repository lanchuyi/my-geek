import Vue from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'

// 定义全局指令
Vue.directive('highlight', (el) => {
  const codeList = el.querySelectorAll('pre code')
  codeList.forEach((code) => {
    hljs.highlightElement(code)
  })
})
