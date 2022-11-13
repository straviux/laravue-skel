import {createStore} from "vuex"
import axiosClient from "../axios"
import articlesModule from "./modules/articles/index"
import carouselModule from "./modules/carousel/index"
import galleryModude from "./modules/gallery/index"
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

      latestNews: {
        loading: false,
        links: [],
        data: []
      },
      latestStory: {
        loading: false,
        links: [],
        data: []
      },


      notification: {
        show: false,
        type: 'success',
        message: ''
      }

    },
    getters: {},
    actions: {
      // story_actions,
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

      getLatestList({commit},{url = null,pageCount=null, article_type_id=null, featured=null} = {}) {
        commit("setListLoading", true);
        url = url || '/latest-list/'
        return axiosClient
        .get(url, {params:{article_type_id:article_type_id, pageCount:5, featured:0}})
        .then((res)=>{

          if(article_type_id==1) {
            commit("setNewsList",res.data);
            commit("setListLoading", false);
            console.log(res)
            return res;
          } else if (article_type_id==2) {
            commit("setStoryList",res.data);
            commit("setListLoading", false);
            console.log(res)
            return res;
          }
        })
        .catch((err)=>{
          commit("setListLoading", false);
          throw err;
        })
      },

    },
    mutations: {
      setListLoading: (state, loading) => {
        state.latestNews.loading = loading;
      },
      setNewsList: (state, article)=>{
        state.latestNews.data = article.data;
        state.latestNews.links = article.meta.links;
      },

      setStoryList: (state, article)=>{
        state.latestStory.data = article.data;
        state.latestStory.links = article.meta.links;
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
      notify: (state, {message, type}) => {
      state.notification.show = true;
      state.notification.type = type;
      state.notification.message = message;
      setTimeout(() => {
        state.notification.show = false;
      }, 3000)
    },
    },
    modules: {
      articles:articlesModule,
      carousels:carouselModule,
      gallery: galleryModude
    }
  }
)

export default store;
