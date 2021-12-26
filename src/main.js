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

// 路由守卫
//全局前置守卫：初始化时执行、每次路由切换前执行
router.beforeEach((to, from, next) => {
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  }

  if (localStorage.getItem("userMess") && localStorage.getItem("token") && getCookie("MUSIC_U") != "") {
    next() //放行
  } else {
    if (to.meta.loginP) {
      next() //放行
    } else {
      alert("登录过期,请重新登录")
      router.replace({
        path: '/login'
      })
    }
  }
})