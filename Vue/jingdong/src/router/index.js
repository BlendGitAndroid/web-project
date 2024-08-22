import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')
  },{
    path: '/cartList',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "cartList" */ '../views/cartList/CartList')
  },{
    path: '/orderConfirmation/:id/:addressId?',
    name: 'OrderConfirmation',
    component: () => import(/* webpackChunkName: "orderConfirmation" */ '../views/orderConfirmation/OrderConfirmation')
  }, {
    path: '/orderList',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "orderList" */ '../views/orderList/OrderList')
  },{
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop')
  }, {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register/Register'),
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage;
      isLogin ? next({ name: 'Home'}):  next();
    }
  }, {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login'),
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage;
      isLogin ? next({ name: 'Home'}):  next();
    }
  }, {
    path: '/chooseAddressList/:shopId',
    name: 'ChooseAddressList',
    component: () => import(/* webpackChunkName: "chooseAddressList" */ '../views/chooseAddressList/ChooseAddressList'),
  },{
    path: '/myAddressList',
    name: 'MyAddressList',
    component: () => import(/* webpackChunkName: "myAddressList" */ '../views/myAddressList/MyAddressList'),
  }, {
    path: '/upsertAddress/:id?',
    name: 'UpsertAddress',
    component: () => import(/* webpackChunkName: "upsertAddress" */ '../views/upsertAddress/UpsertAddress'),
  }, {
    path: '/person',
    name: 'PersonalInfo',
    component: () => import(/* webpackChunkName: "person" */ '../views/personalInfo/PersonalInfo'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),  // 设置路由模式为hash
  routes
})

// 路由守卫，判断是否登录
// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子
router.beforeEach((to, from ,next) => {
  const { isLogin } = localStorage;
  const { name } = to;
  const isLoginOrRegister = (name === "Login" || name === "Register");
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'Login'}); // 如果已经登录或者是登录注册页面，直接跳转，否则跳转到登录页面
})

export default router
