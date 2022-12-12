import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('./../pages/Login')
const Me = () => import('./../pages/Me')
const Home = () => import('./../pages/Home')

const Profile = () => import('./../pages/Me/Children/Profile')
const Update = () => import('./../pages/Me/Children/Update')
const EditPassword = () => import('./../pages/Me/Children/EditPassword')

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
        { path: 'profile', component: Profile },
        { path: '/user', redirect: '/user/profile' },
        { path: 'update_userinfo', component: Update },
        { path: 'update_password', component: EditPassword }
      ]
    },
    {
      path: '/home',
      component: Home
    }
  ]
})





