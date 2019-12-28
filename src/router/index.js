import Vue from 'vue'
import VueRouter from 'vue-router'
import Yuedu from '../views/Yuedu.vue'
import Articles from '../views/Articles.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Articles
  },
  {
    path: '/channel/:tab',
    name: 'tab',
    component: Yuedu,
    meta: { 
      title: '悦读-悦读FM',
      isLogin: false
    },
  },
  {
    path: '/channel/:tab/:page/',
    name: 'page',
    component: Yuedu,
    meta: { title: '悦读-悦读FM'},
  },
  {
    path: '/article/:id',
    name: 'articles',
    component: () => import('../views/Articles.vue'),
  },
  {
    path: "*",
    redirect: "/"
}
]
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  
scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }}
})

export default router