import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import '../static/css/reset.css'

// 引入图片懒加载
import VueLazyload from 'vue-lazyload'

// 引入路由
import router from '../router/index'
//引入store
import store from '../store/index'

// 引入animate
import 'animate.css';

// 引入字体
import '../static/css/iconfont.css'


Vue.config.productionTip = false


// 应用饿了么ui组件库
Vue.use(ElementUI);
// 应用图片懒加载
const loadimage = require('../static/img/jiaz.gif')
const errorimage = require('../static/img/tupian-shibai.png')
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')