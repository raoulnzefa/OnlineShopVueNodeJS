import store from "@/store"
import Login from '../pages/Login.vue'
import {createRouter,createWebHashHistory} from 'vue-router'
import middlewarePipeline from "@/router/middlewarePipeline";
import Home from '../pages/Home'
import Register from '../pages/Register'
import AuthPage from '../pages/AuthPage'
import auth from '../middleware/auth'
import Products from '../pages/Products'
import Product from '../pages/Product'
import Payment from '../pages/Payment'
import VerifyEmail from '../pages/VerifyEmail'
import VerifySent from '../pages/VerifySent'
import AccountSettings from '../pages/AccountSettings'
import ResetPassword from '../pages/ResetPassword'
import ChangePassword from '../pages/ChangePassword'
import Orders from '../pages/Orders'

const routes = [
    {path:'/',name:'home',component:Home},
    {path:'/login',name:'login',component:Login},
    {path:'/register',name:'register',component:Register},
    {path:'/auth',name:'auth',component:AuthPage,meta: { middleware: [auth] }},
    {path:'/products',name:'products',component:Products},
    {path: '/product/:productname', component: Product },
    {path: '/products/:category', component: Products },
    {path: '/payment', component: Payment },
    {path: '/authentication/activate/:token', component: VerifyEmail },
    {path: '/authentication/reset-password/:token', component: ChangePassword },
    {path: '/verify-sent', component: VerifySent },
    {path: '/reset-password', component: ResetPassword },
    {path: '/account/settings', component: AccountSettings,meta: { middleware: [auth] } },
    {path: '/account/orders', component: Orders},
]



const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const middleware = to.meta.middleware;
    const context = { to, from, next, store };
  
    if (!middleware) {
      return next();
    }
  
    middleware[0]({
      ...context,
      next: middlewarePipeline(context, middleware, 1),
    });
  });



export default router;