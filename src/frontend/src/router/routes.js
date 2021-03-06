export default [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue'),
    meta: { layout: 'AppLayoutDefault' },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('../views/Orders.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
  },
];
