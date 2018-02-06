// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueResource from 'vue-resource'

Vue.use(VueResource);

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(Mint);

import './assets/js/rem3.0'
import '../src/assets/css/base.css'
import '../src/assets/css/normalize.css'

import Api from './utils/Api'

Vue.use(Api);

import vFocus from './utils/v-focus'

import store from './store'
import '../src/utils/jquery-3.1.1.min'

Vue.config.productionTip = false;

import {wxShare} from "./utils/wxConfig";

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vFocus,
  mounted() {
    wxShare()
  },
  template: '<App/>',
  components: {App}
});
