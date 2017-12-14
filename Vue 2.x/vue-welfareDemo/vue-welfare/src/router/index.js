import Vue from 'vue'
import Router from 'vue-router'
import Welfare from '../views/welfare.vue'
import Ios from '../views/ios.vue'
import Android from '../views/android.vue'
import Web from '../views/h5.vue'
import Recommend from '../views/recommend.vue'

Vue.use(Router)

export default new Router({
  'linkActiveClass': 'active',
  routes: [
    {
      path: '/',
      name: 'Welfare',
      component: Welfare
    },
    {
      path: '/welfare',
      name: 'welfare',
      component: Welfare
    },
    {
      path: '/ios',
      name: 'ios',
      component: Ios
    },
    {
      path: '/android',
      name: 'android',
      component: Android
    },
    {
      path: '/web',
      name: 'web',
      component: Web
    },
    {
      path: '/day',
      name: 'day',
      component: Recommend
    }
  ]
})
