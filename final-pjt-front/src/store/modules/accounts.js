import router from '@/router'
import axios from 'axios'
import drf from '@/api/drf'


export default {

  // state는 직접 접근하지 않는다.
  state: {
    token: localStorage.getItem('token') || '' ,
    currentUser: {},
    profile: {},
    authError: null,
    followMovies: [],
  },

  // 모든 state는 getters 를 통해서 접근한다.
  getters: {
    isLoggedIn: state => !!state.token,
    currentUser: state => state.currentUser,
    profile: state => state.profile,
    authError: state => state.authError,
    authHeader: state => ({ Authorization: `Token ${state.token}`}),
    followMovies: state => state.followMovies
  },

  mutations: {
    SET_TOKEN: (state, token) => state.token = token,
    SET_CURRENT_USER: (state, user) => state.currentUser = user,
    SET_PROFILE: (state, profile) => state.profile = profile,
    SET_AUTH_ERROR: (state, error) => state.authError = error,
    SET_FOLLOW_MOVIES: (state, movies) => state.followMovies = movies
  },

  actions: {
    // state.token 추가 localStorage에 token 추가
    saveToken({ commit }, token) {
      commit('SET_TOKEN', token)
      localStorage.setItem('token', token)
    },
    
    // state.token 삭제 localStorage에 token 갱신
    removeToken({ commit }) {
      commit('SET_TOKEN', '')
      localStorage.setItem('token', '')
    },

    // 로그인 요청
    login({ commit, dispatch }, credentials) {
      axios({
        url: drf.accounts.login(),
        method: 'post',
        data: credentials
      })
        .then(res => {
          const token = res.data.key
          dispatch('saveToken', token)
          dispatch('fetchCurrentUser')
        })
        .catch(err => {
          alert('잘못된 사용자입니다')
          console.error(err.response.data)
          commit('SET_AUTH_ERROR', err.response.data)
        })
    },

    // 회원가입 요청
    signup({ commit, dispatch }, credentials) {
      axios({
        url: drf.accounts.signup(),
        method: 'post',
        data: credentials
      })
        .then(res => {
          const token = res.data.key
          dispatch('saveToken', token)
          dispatch('fetchCurrentUser')
          router.push({ name: 'homeView' })
        })
        .catch(err => {
          console.error(err.response.data)
          commit('SET_AUTH_ERROR', err.response.data)
        })
    },

    // 로그아웃 요청
    logout({ getters, dispatch }) {
      axios({
        url: drf.accounts.logout(),
        method: 'post',
        headers: getters.authHeader,
      })
        .then(() => {
          dispatch('removeToken')
          alert('로그아웃 되었습니다.')
        })
        .catch(err => {
          console.error(err.response)
        })
    },

    // 현재 유저 확인
    fetchCurrentUser({ commit, getters, dispatch }) {
      if (getters.isLoggedIn) {
        axios({
          url: drf.accounts.currentUserInfo(),
          method: 'get',
          headers: getters.authHeader,
        })
          .then(res => commit('SET_CURRENT_USER', res.data))
          .catch(err => {
            if (err.response.status === 401) {
              dispatch('removeToken')
              router.push({ name: 'home' })
            }
          })
      }
    },

    // 해당 유저 정보
    fetchProfile({ commit, getters }, { username }) {
      axios({
        url: drf.accounts.profile(username),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_PROFILE', res.data)
        })
    },

    // 팔로우하는 유저 정보
    followUser({ commit, getters }, userPk ) {
      axios({
        url: drf.accounts.follow(userPk),
        method: 'post',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_PROFILE', res.data)})
        .catch(err => console.error(err.response))
    },

    // 팔로우하는 유저가 좋아하는 영화 정보
    followUserMovies({ commit, getters } ) {
      axios({
        url: drf.accounts.followMovies(),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_FOLLOW_MOVIES', res.data)})
        .catch(err => {
          console.error(err.response)})
    },
  },
}
