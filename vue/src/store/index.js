import {createStore} from "vuex"
import axiosClient from "../axios"


const store = createStore(
  {
    state: {

      user: {
        data: {},
        token: localStorage.getItem('TOKEN')
      },
      dashboard: {
      loading: false,
      data: {}
      },
      newsList: {
        loading: false,
        data: []
      },
      currentNews: {
        loading: false,
        data: {}
      },

      notification: {
        show: false,
        type: 'success',
        message: ''
      }

    },
    getters: {},
    actions: {
      getUser({commit}) {
        return axiosClient.get('/user')
          .then(res => {
            commit('setUser', res.data)
          })
      },
      register({commit}, user) {
        return axiosClient.post('/register', user)
        .then(({data})=> {
          commit('setUser',data);
          return data;
        })
      },
      login({commit}, user) {
        return axiosClient.post('/login', user)
        .then(({data})=> {
          commit('setUser', data.user);
          commit('setToken', data.token)
          return data;
        })
      },
      logout({commit}) {
        return axiosClient.post('/logout')
          .then(response=>{
            commit('logout');
            return response;
          })
      },

      getNewsList({commit}) {
        commit("setCurrentNewsLoading", true);
        return axiosClient
        .get(`/articles/`)
        .then((res)=>{
          commit("setNews",res.data);
          commit("setNewsLoading", false);
          console.log(res.data)
          return res;
        })
        .catch((err)=>{
          commit("setNewsLoading", false);
          throw err;
        })
      },
      getNews({commit}, id) {
        commit("setCurrentNewsLoading", true);
        return axiosClient
        .get(`/articles/${id}`)
        .then((res)=>{
          commit("setCurrentNews",res.data);
          commit("setCurrentNewsLoading", false);
          console.log(res.data)
          return res;
        })
        .catch((err)=>{
          commit("setCurrentNewsLoading", false);
          throw err;
        })
      },
      saveNews({commit},news){
        delete news.cover_photo_url;
        let response;
        if(news.id) {
          response = axiosClient.put(`/articles/${news.id}`, news)
          .then((res)=>{
            commit("setCurrentNews", res.data);
            return res;
          })
        } else {
          response = axiosClient.post("/articles", news).then((res)=>{
            commit("setCurrentNews", res.data);
            return res;
          })
        }
        return response;
      },
    },
    mutations: {
      setNewsLoading: (state, loading) => {
        state.newsList.loading = loading;
      },
      setNews: (state, news)=>{
        state.newsList.data = news.data;
      },
      setCurrentNewsLoading: (state, loading) => {
        state.currentNews.loading = loading;
      },
      setCurrentNews: (state, news)=>{
        state.currentNews.data = news.data;
      },
      logout: (state) => {
        state.user.token = null;
        state.user.data = {};
        localStorage.removeItem('TOKEN')
      },
      setUser: (state, user) => {
        state.user.data = user;
      },
      setToken: (state, token) => {
        state.user.token = token;
        localStorage.setItem('TOKEN', token);
      },
    },
    modules: {}
  }
)

export default store;
