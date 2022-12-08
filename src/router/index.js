import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('./../pages/Login')
const Me = () => import('./../pages/Me')

const Profile = () => import('./../pages/Me/Children/Profile')



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
      path: '/me',
      component: Me,
      children: [
        { path: 'profile', component: Profile },
        { path: '/me', redirect: '/me/profile' }
      ]
    }
  ]
})





