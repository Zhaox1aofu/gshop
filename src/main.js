// 入口js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {Button} from 'mint-ui'
import './mock/mockServer' // 加载mockServer即可
// 注册全局组件
Vue.component(Button.name, Button) // <mt-button>

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store // 使用上vuex
})
