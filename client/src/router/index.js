import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/getProduct.vue';
// import Product from '../views/product.vue';
import login from '../views/login.vue';
import register from '../views/register.vue';
import addProduct from '../views/addProduct.vue';
import actionPage from '../views/actionProduct.vue';
import editPage from '../components/editPage.vue';
// import getProduct from '../views/getProduct.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/add',
    name: 'add',
    component: addProduct,
  },
  {
    path: '/product',
    name: 'product',
    component: Home,
  },
  {
    path: '/product/:id',
    name: 'product-action',
    component: actionPage,
    children: [{
      path: 'edit',
      name: 'edit',
      component: editPage,
    }],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if ((to.name === 'login' || to.name === 'register') && localStorage.getItem('access_token')) {
    next({ name: 'product' });
  } else if (to.name !== 'login' && to.name !== 'register' && !localStorage.getItem('access_token')) {
    next(from.path);
  } else if (to.path === '/' && localStorage.getItem('access_token')) {
    next({ name: 'product' });
  } else next();
});

export default router;
