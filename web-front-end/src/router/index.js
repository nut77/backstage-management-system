import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/menuList'
  },
  {
    path: '/menuList',
    name: 'MenuList',
    component: () => import('../views/MenuList.vue')
  },
  {
    path: '/prepaidPhoneList',
    name: 'PrepaidPhoneList',
    component: () => import('../views/PrepaidPhoneList.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('../views/Error.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  if (to.path !== '/login' && (token === 'null' || !token)) {
    next('login');
    return 0;
  }

  if (to.path === '/login' && (token !== 'null' && token)) {
    next('menuList');
    return 0;
  }

  if (to.matched.length === 0) {
    next('error');
    return 0;
  }

  next();
});

export default router
