// Composables
import { createRouter, createWebHistory } from 'vue-router'

const isUserAuthenticated = () => {
  const localStorageUser = localStorage.getItem('user')
  if (!localStorageUser) {
    return false
  }
  return true
};

const validateUserSession = (to, from, next) => {
  if (!isUserAuthenticated()) {
    return next('/login')
  }
  next();
};

const validateGuest = (to, from, next) => {
  if (isUserAuthenticated()) {
    return next('/')
  }
  next();
}

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        beforeEnter: validateUserSession,
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        beforeEnter: validateGuest, 
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Login.vue'),
      },
      {
        path: '/register',
        name: 'Register',
        beforeEnter: validateGuest, 
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Register.vue'),
      },
    ],
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
