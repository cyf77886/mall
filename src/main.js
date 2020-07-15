import Vue from 'vue'
import App from './App.vue'
import  router from './router/index'
import store from "./store";
import "assets/css/base.css";

import toast from 'components/common/toast'
Vue.config.productionTip = false
//添加事件总线对象
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
