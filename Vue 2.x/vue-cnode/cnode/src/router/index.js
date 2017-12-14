import Vue from 'vue'
import Router from 'vue-router'

import About from '../views/about.vue'
import Index from '../views/index.vue'
import List from '../views/list.vue'
import Login from '../views/login.vue'
import Message from '../views/message.vue'
import New from '../views/new.vue'
import Topic from '../views/topic.vue'
import User from '../views/user.vue'


Vue.use(Router)

const routers = [{
  path: '/',
  name: 'home',
  component: Index
}, {
  path: '/cnodevue',
  name: 'cnodevue',
  component: Index
}, {
  path: '/list',
  name: 'list',
  component: List
}, {
  path: '/topic/:id',
  name: 'topic',
  component: Topic
}, {
  path: '/add',
  name: 'add',
  component: New,
  meta: { requiresAuth: true }
}, {
  path: '/message',
  name: 'message',
  component: Message,
  meta: { requiresAuth: true }
}, {
  path: '/user/:loginname',
  name: 'user',
  component: User
}, {
  path: '/about',
  name: 'about',
  component: About
}, {
  path: '/login',
  name: 'login',
  component: Login
}, {
  path: '*',
  component: Index
}];


export default new Router({
  mode: 'history',
  routes: routers
})
