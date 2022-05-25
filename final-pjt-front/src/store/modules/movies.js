import axios from 'axios'
import drf from '@/api/drf'
import router from '@/router'

import _ from 'lodash'
// import accounts from './accounts'

export default {
  // namespaced: true,
  state: {
    movies: [],
    recomMovies: [],
    worldMovies: [],
    movie: {},
  },

  getters: {
    movies: state => state.movies,
    recomMovies: state => state.recomMovies,
    worldMovies: state => state.worldMovies,
    movie: state => state.movie,
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
    SET_MOVIE_REVIEWS: (state, reviews) => (state.movie.reviews = reviews),
  },
  actions: {
    fetchMovies({ commit }) {
      /* 영화 목록 받아오기
      GET: movies URL (token)
        성공하면
          응답으로 받은 게시글들을 state.movies에 저장
        실패하면
          에러 메시지 표시
      */
      axios({
        url: drf.movies.movies(),
        method: 'get',
        // headers: getters.authHeader,
      })
        .then(res => commit('SET_MOVIES', res.data))
        .catch(err => console.error(err.response))
    },

    fetchMovie({ commit, getters }, movieId) {
      /* 단일 게시글 받아오기
      GET: movie URL (token)
        성공하면
          응답으로 받은 게시글들을 state.movies에 저장
        실패하면
          단순 에러일 때는
            에러 메시지 표시
          404 에러일 때는
            NotFound404 로 이동
      */
      axios({
        url: drf.movies.movie(movieId),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => commit('SET_MOVIE', res.data))
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404) {
            router.push({ name: 'NotFound404' })
          }
        })
    },

    fetchRecomMovies({ commit, getters }) {
      /* 영화 목록 받아오기
      GET: movies URL (token)
        성공하면
          응답으로 받은 게시글들을 state.movies에 저장
        실패하면
          에러 메시지 표시
      */
      axios({
        url: drf.movies.recommendMovie(),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => commit('SET_RECOM_MOVIES', res.data))
        .catch(err => {
          console.error(err.response)})
    },

    fetchWorldcupMovies({ commit }) {
      /* 영화 목록 받아오기
      GET: movies URL (token)
        성공하면
          응답으로 받은 게시글들을 state.movies에 저장
        실패하면
          에러 메시지 표시
      */
      axios({
        url: drf.movies.worldcupMovie(),
        method: 'get',
        // headers: getters.authHeader,
      })
        .then(res => commit('SET_WORLDCUP_MOVIES', res.data))
        .catch(err => {
          console.error(err.response)})
    },

    // createArticle({ commit, getters }, article) {
    //   /* 게시글 생성
    //   POST: articles URL (게시글 입력정보, token)
    //     성공하면
    //       응답으로 받은 게시글을 state.article에 저장
    //       ArticleDetailView 로 이동
    //     실패하면
    //       에러 메시지 표시
    //   */
      
    //   axios({
    //     url: drf.articles.articles(),
    //     method: 'post',
    //     data: article,
    //     headers: getters.authHeader,
    //   })
    //     .then(res => {
    //       commit('SET_ARTICLE', res.data)
    //       router.push({
    //         name: 'article',
    //         params: { articlePk: getters.article.pk }
    //       })
    //     })
    // },

    // updateArticle({ commit, getters }, { pk, title, content}) {
    //   /* 게시글 수정
    //   PUT: article URL (게시글 입력정보, token)
    //     성공하면
    //       응답으로 받은 게시글을 state.article에 저장
    //       ArticleDetailView 로 이동
    //     실패하면
    //       에러 메시지 표시
    //   */
    //   axios({
    //     url: drf.articles.article(pk),
    //     method: 'put',
    //     data: { title, content },
    //     headers: getters.authHeader,
    //   })
    //     .then(res => {
    //       commit('SET_ARTICLE', res.data)
    //       router.push({
    //         name: 'article',
    //         params: { articlePk: getters.article.pk }
    //       })
    //     })
    // },

    // deleteArticle({ commit, getters }, articlePk) {
    //   /* 게시글 삭제
    //   사용자가 확인을 받고
    //     DELETE: article URL (token)
    //       성공하면
    //         state.article 비우기
    //         AritcleListView로 이동
    //       실패하면
    //         에러 메시지 표시
    //   */
      
    //   if (confirm('정말 삭제하시겠습니까?')) {
    //     axios({
    //       url: drf.articles.article(articlePk),
    //       method: 'delete',
    //       headers: getters.authHeader,
    //     })
    //       .then(() => {
    //         commit('SET_ARTICLE', {})
    //         router.push({ name: 'articles' })
    //       })
    //       .catch(err => console.error(err.response))
    //   }
    // },

    likeMovie({ commit, getters }, movieId) {
      /* 좋아요
      POST: likeMovie URL(token)
        성공하면
          state.movie 갱신
        실패하면
          에러 메시지 표시
      */
      axios({
        url: drf.movies.likeMovie(movieId),
        method: 'post',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_MOVIE', res.data)})
        .catch(err => console.error(err.response))
    },

		createReview({ commit, getters }, { movieId, content, vote }) {
      /* 리뷰 생성
      POST: reviews URL(댓글 입력 정보, token)
        성공하면
          응답으로 state.movie의 reviews 갱신
        실패하면
          에러 메시지 표시
      */
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

    updateReview({ commit, getters }, { movieId, reviewId, content, vote }) {
      /* 리뷰 수정
      PUT: review URL(댓글 입력 정보, token)
        성공하면
          응답으로 state.movie의 reviews 갱신
        실패하면
          에러 메시지 표시
      */
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

    deleteReview({ commit, getters }, { movieId, reviewId }) {
      /* 리뷰 삭제
      사용자가 확인을 받고
        DELETE: review URL (token)
          성공하면
            응답으로 state.movie의 reviews 갱신
          실패하면
            에러 메시지 표시
      */
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