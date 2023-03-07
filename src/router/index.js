import Vue from 'vue'
import VueRouter from 'vue-router'

//组件
const Login = () => import('./../pages/Login')
const Me = () => import('./../pages/Me')
const Home = () => import('./../pages/Home')

const Profile = () => import('./../pages/Me/Children/Profile')
const Update = () => import('./../pages/Me/Children/Update')
const EditPassword = () => import('./../pages/Me/Children/EditPassword')

const Search = () => import('./../pages/Search')
const Goods = () => import('./../pages/Goods')
const ProductSearch = () => import('./../pages/ProductSearch')

const ShopCart = () => import('./../pages/ShopCart')

//后台管理员部分
const AdminLogin = () => import('./../pages/Admin/Chidren/AdminLogin')
const Admin = () => import('./../pages/Admin/Main')
const GoodsManage = () => import('./../pages/Admin/Chidren/GoodsManage')
const UserList = () => import('./../pages/Admin/Chidren/UserList')
const GoodsUpdate = () => import('./../pages/Admin/Chidren/GoodsUpdate')
const GoodsAdd = () => import('./../pages/Admin/Chidren/GoodsAdd')

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/user',
      component: Me,
      children: [
        { path: 'profile', component: Profile, meta: { showHeaderTop: true } },
        { path: '/user', redirect: '/user/profile' },
        { path: 'update_userinfo', component: Update, meta: { showHeaderTop: true } },
        { path: 'update_password', component: EditPassword, meta: { showHeaderTop: true } }
      ]
    },
    {
      path: '/home',
      component: Home,
      meta: { showHeaderTop: true }
    },
    {
      path: '/goods/:id',
      component: Goods,
      meta: { showHeaderSearch: true, showHeaderTop: true }
    },
    {
      path: '/search/:id/:pageNo',
      component: Search,
      meta: { showHeaderSearch: true }
    },
    {
      path: '/productsearch',
      component: ProductSearch,
      meta: { showHeaderSearch: true }
    },
    {
      path: '/adminlogin',
      component: AdminLogin
    },
    {
      path: '/shopcart',
      component: ShopCart,
      meta: { showHeaderTop: true }
    },
    {
      path: '/admin',
      component: Admin,
      children: [
        { path: 'goodsmanage', component: GoodsManage },
        { path: 'userlist', component: UserList },
        { path: 'updategoods', component: GoodsUpdate },
        { path: 'goodsadd', component: GoodsAdd },
        //初始子路径配置
        { path: '/admin', redirect: '/admin/goodsmanage' }
      ]
    }
  ]
})

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写push/replace
//第一个参数：告诉原来的push方法，往哪里跳转（传递哪些参数）
//第二个参数：成功的回调
//第三个参数：失败的回调
//call/apply区别
//相同点：都可以调用函数一次，都可以篡改函数的上下文(this）一次‘
//不同点：call/apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { });
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => { }, () => { });
  }
}





