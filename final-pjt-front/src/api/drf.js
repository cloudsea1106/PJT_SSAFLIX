const HOST = 'http://127.0.0.1:8000/api/v1/'

const ACCOUNTS = 'accounts/'
const MOVIES = 'movies/'


export default {
  accounts: {
    login: () => HOST + ACCOUNTS + 'login/',
    logout: () => HOST + ACCOUNTS + 'logout/',
    signup: () => HOST + ACCOUNTS + 'signup/',
    currentUserInfo: () => HOST + ACCOUNTS + 'user/',
    profile: username => HOST + ACCOUNTS + 'profile/' + username,
    follow: userPk => HOST + ACCOUNTS + `${userPk}/` + 'follow/',
    followMovies: () => HOST + ACCOUNTS + 'recommend/follow/'
  },
  movies: {
    movies: () => HOST + MOVIES,
    movie: moviePk => HOST + MOVIES + `${moviePk}/`,
    recommendMovie: () => HOST + MOVIES + 'recommend/genre/',
    worldcupMovie: () => HOST + MOVIES + 'recommend/worldcup/',
    likeMovie: moviePk => HOST + MOVIES + `${moviePk}/` + 'like/',
    reviews: moviePk => HOST + MOVIES + `${moviePk}/` + 'reviews/',
    review: (moviePk, reviewPk) =>
      HOST + MOVIES + `${moviePk}/` + 'reviews/' + `${reviewPk}/`,
  },
}
