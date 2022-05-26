import axios from 'axios'
import drf from '@/api/drf'
import router from '@/router'

import _ from 'lodash'

export default {

  state: {
    movies: [],
    recomMovies: [],
    worldMovies: [],
    movie: {},
    movieReviews: [],
  },

  getters: {
    movies: state => state.movies,
    recomMovies: state => state.recomMovies,
    worldMovies: state => state.worldMovies,
    movie: state => state.movie,
    movieReviews: state => state.movie.review_set,
    isAuthor: (state, getters) => {
      return state.movie.user?.username === getters.currentUser.username
    },
    isMovie: state => !_.isEmpty(state.movie),
  },

  mutations: {
    SET_MOVIES: (state, movies) => state.movies = movies,
    SET_RECOM_MOVIES: (state, recomMovies) => state.recomMovies = recomMovies,
    SET_WORLDCUP_MOVIES: (state, worldMovies) => state.worldMovies = worldMovies,
    SET_MOVIE: (state, movie) => state.movie = movie,
    SET_MOVIE_REVIEWS: (state, reviews) => (state.movieReviews = reviews),
  },

  actions: {
    // 영화 목록
    fetchMovies({ commit }) {
      axios({
        url: drf.movies.movies(),
        method: 'get',
      })
        .then(res => commit('SET_MOVIES', res.data))
        .catch(err => console.error(err.response))
    },

    // 특정 영화 정보
    fetchMovie({ commit }, movieId) {
      axios({
        url: drf.movies.movie(movieId),
        method: 'get',
      })
        .then(res => commit('SET_MOVIE', res.data))
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404) {
            router.push({ name: 'NotFound404' })
          }
        })
    },

    // 추천 영화 정보
    fetchRecomMovies({ commit, getters }) {
      axios({
        url: drf.movies.recommendMovie(),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => commit('SET_RECOM_MOVIES', res.data))
        .catch(err => {
          console.error(err.response)})
    },

    // 월드컵용 16개 영화 정보
    fetchWorldcupMovies({ commit }) {
      axios({
        url: drf.movies.worldcupMovie(),
        method: 'get',
      })
        .then(res => commit('SET_WORLDCUP_MOVIES', res.data))
        .catch(err => {
          console.error(err.response)})
    },

    // 영화 좋아요
    likeMovie({ commit, getters }, movieId) {
      axios({
        url: drf.movies.likeMovie(movieId),
        method: 'post',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_MOVIE', res.data)})
        .catch(err => console.error(err.response))
    },

    // 리뷰 생성
		createReview({ commit, getters }, { movieId, content, vote }) {
      const review = { content, vote }
      axios({
        url: drf.movies.reviews(movieId),
        method: 'post',
        data: review,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_MOVIE_REVIEWS', res.data)
        })
        .catch(err => console.error(err.response))
    },

    // 리뷰 수정
    updateReview({ commit, getters }, { movieId, reviewId, content, vote }) {

      const review = { content, vote }

      axios({
        url: drf.movies.review(movieId, reviewId),
        method: 'put',
        data: review,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_MOVIE_REVIEWS', res.data)
        })
        .catch(err => console.error(err.response))
    },

    // 리뷰 삭제
    deleteReview({ commit, getters }, { movieId, reviewId }) {
        if (confirm('정말 삭제하시겠습니까?')) {
          axios({
            url: drf.movies.review(movieId, reviewId),
            method: 'delete',
            data: {},
            headers: getters.authHeader,
          })
            .then(res => {
              commit('SET_MOVIE_REVIEWS', res.data)
            })
            .catch(err => console.error(err.response))
        }
      },
  },
}