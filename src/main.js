import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import ElementUI from 'element-ui'


// import 'bootstrap/dist/css/bootstrap.css'

//引入图片懒加载
import Vant, { Lazyload } from 'vant';
import 'vant/lib/index.css'
Vue.use(Vant);
Vue.use(Lazyload);

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// //刷新保存状态
// if (sessionStorage.getItem("store")) {
//   store.replaceState(
//     Object.assign(
//       {},
//       store.state,
//       JSON.parse(sessionStorage.getItem("store"))
//     )
//   );
//   sessionStorage.removeItem("store")
// }

// //监听，在页面刷新时将vuex里的信息保存到sessionStorage里
// window.addEventListener("beforeunload", () => {
//   sessionStorage.setItem("store", JSON.stringify(store.state));
// });