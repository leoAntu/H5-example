import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/goods/goods.vue'
import Ratings from '../components/ratings/ratings.vue'
import Seller from '../components/seller/seller.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'seller',
      component: Ratings
    },

    {
      path: '/seller',
      name: 'seller',
      component: Seller
    },
    {
      path: '/',
      redirect: '/goods'
    }
  ],
  mode: 'history'
})
