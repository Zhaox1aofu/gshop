// 入口js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './filters' // 加载自定义过滤器
import VueLazyload from 'vue-lazyload'

import {Button} from 'mint-ui'
import './mock/mockServer' // 加载mockServer即可
import loading from './common/imgs/loading.gif'
// 注册全局组件
Vue.component(Button.name, Button) // <mt-button>
Vue.use(VueLazyload, {
  loading
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store // 使用上vuex
})
