// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import vueResource from 'vue-resource';
import infiniteScroll from 'vue-infinite-scroll';  // 引入滑动模块
import VueLazyload from 'vue-lazyload';  // 引入图片懒加载模块
import VueAwesomeSwiper from 'vue-awesome-swiper'

import {loadFromlLocal} from './common/js/store';  // 公共方法：本地缓存
import './common/css/index.styl'; // 引入公共样式
import './common/css/swiper-3.4.2.min.css'

Vue.config.productionTip = false
Vue.use(vueResource);
Vue.use(infiniteScroll);
Vue.use(VueAwesomeSwiper)

Vue.use(VueLazyload, {
  error: require('./assets/404.png'),
  loading: require('./assets/loading.gif'),
  attempt: 1
});

if (!loadFromlLocal('gank', 'wecome', false)) {
  console.log('1111111111111111');
  // router.push('/wecome');
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
