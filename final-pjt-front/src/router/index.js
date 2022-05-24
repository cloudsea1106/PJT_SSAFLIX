import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '../views/HomeView.vue'
import MyPageView from '../views/MyPageView.vue'
import WorldcupView from '../views/WorldcupView.vue'
import MovieDetail from '../components/MovieDetail.vue'

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
    path: '/movies/:movieId',
    name: 'movie',
    component: MovieDetail
  },
  {
    path: '/worldcup',
    name: 'worldcupView',
    component: WorldcupView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
