// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/user'
import $ from 'webpack-zepto'
import FastClick from 'fastclick';
import filters from './filters';
import Alert from './libs/alert';

Vue.use(Alert);

$.ajaxSettings.crossDomain = true;

// 实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
FastClick.attach(document.body);



Vue.config.productionTip = false

// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (window.sessionStorage.user) {
  store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.user));
}

// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, from, next) => {
  // 处理左侧滚动不影响右边
  // $('html, body, #page').removeClass('scroll-hide');
  $('body').css('overflow', 'auto');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.userInfo.userId) {
      console.log('跳转111111111111111111111111111');
      next();
    } else {
      console.log('跳转22222222222222222222222222222' + to.fullPath);
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }
  } else {
    console.log('跳转3333333333333333333333333333');
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
