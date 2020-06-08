import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import CaptionItem from '../views/CaptionItem.vue'
import EditCaptionItem from '../views/EditCaptionItem.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

function checkAuthentication(to, from, next) {
  if (!localStorage.capToolToken) {
    next('/login');
  } else {
    next();
  }
}

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: checkAuthentication
  },
  {
    path: '/caption/:id',
    name: 'CaptionItem',
    component: CaptionItem,
    beforeEnter: checkAuthentication
  },
  {
    path: '/edit/caption/:id',
    name: 'EditCaptionItem',
    component: EditCaptionItem,
    beforeEnter: checkAuthentication
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: checkAuthentication
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
