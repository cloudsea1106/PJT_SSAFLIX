import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '../views/HomeView.vue'
import MyPageView from '../views/MyPageView.vue'
import ProfileView from '../components/ProfileView.vue'
import WorldcupView from '../views/WorldcupView.vue'
import MovieDetail from '../components/MovieDetail.vue'
import NotFound404 from '../views/NotFound404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homeView',
    component: HomeView
  },
  {
    path: '/mypage/:username',
    name: 'mypageView',
    component: MyPageView
  },
  {
    path: '/profile/:username',
    name: 'profileView',
    component: ProfileView
  },
  {
    path: '/movies/:movieId',
    name: 'movie',
    component: MovieDetail
  },
  {
    path: '/worldcup',
    name: 'worldcupView',
    component: WorldcupView
  },
  {
    path: '/404',
    name: 'NotFound404',
    component: NotFound404
  },
  {
    path: '*',
    redirect: '/404'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
