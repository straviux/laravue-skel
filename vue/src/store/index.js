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
        links: [],
        data: []
      },
      featuredNewsList: {
        loading: false,
        links: [],
        data: []
      },
      currentNews: {
        loading: false,
        data: {}
      },

      storyList: {
        loading: false,
        links: [],
        data: []
      },
      featuredStoryList: {
        loading: false,
        links: [],
        data: []
      },
      currentStory: {
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


      getStoryList({commit},{url = null,article_type_id=null,pageCount=null,status=null,featured=null, search=null} = {}) {
        commit("setStoryLoading", true);
        url = url || '/articles/'
        return axiosClient
        .get(url,{params:{article_type_id:article_type_id,pageCount:pageCount,status:status,featured:featured,search:search}})
        .then((res)=>{
          commit("setStory",res.data);
          commit("setStoryLoading", false);
          console.log(res.data)
          return res;
        })
        .catch((err)=>{
          commit("setStoryLoading", false);
          throw err;
        })
      },

      getStory({commit}, id) {
        commit("setCurrentStoryLoading", true);
        return axiosClient
        .get(`/articles/${id}`)
        .then((res)=>{
          commit("setCurrentStory",res.data);
          commit("setCurrentStoryLoading", false);
          console.log(res.data)
          return res;
        })
        .catch((err)=>{
          commit("setCurrentStoryLoading", false);
          throw err;
        })
      },

      saveStory({commit},story){
        delete story.cover_photo_url;
        let response;
        if(story.id) {
          response = axiosClient.put(`/articles/${story.id}`, story)
          .then((res)=>{
            commit("setCurrentStory", res.data);
            return res;
          })
        } else {
          response = axiosClient.post("/articles", news).then((res)=>{
            commit("setCurrentStory", res.data);
            return res;
          })
        }
        return response;
      },

      getPublicStoryList({commit},{url = null} = {}) {
        commit("setStoryLoading", true);
        url = url || '/story-list/'
        return axiosClient
        .get(url, {params:{article_type_id:2}})
        .then((res)=>{
          commit("setStoryLoading",res.data);
          commit("setNewsLoading", false);
          console.log(res.data)
          return res;
        })
        .catch((err)=>{
          commit("setStoryLoading", false);
          throw err;
        })
      },

      getFeaturedStoryList({commit},{url = null} = {}) {
        commit("setFeaturedStoryLoading", true);
        url = url || '/featured-story-list/'
        return axiosClient
       .get(url, {params:{article_type_id:2}})
        .then((res)=>{
          commit("setFeaturedStory",res.data);
          commit("setFeaturedStoryLoading", false);
          console.log(res.data)
          return res;
        })
        .catch((err)=>{
          commit("setFeaturedStoryLoading", false);
          throw err;
        })
      },

      getStoryBySlug({commit}, slug) {
        commit("setCurrentStoryLoading", true);
        return axiosClient
        .get(`/story-by-slug/${slug}`)
        .then((res)=>{
          commit("setCurrentStory",res.data);
          commit("setCurrentStoryLoading", false);
          console.log(res.data)
          return res;
        })
        .catch((err)=>{
          commit("setCurrentStoryLoading", false);
          throw err;
        })
      },

      getNewsList({commit},{url = null,article_type_id=null,pageCount=null,status=null,featured=null, search=null} = {}) {
        commit("setNewsLoading", true);
        url = url || '/articles/'
        return axiosClient
        .get(url,{params:{article_type_id:article_type_id,pageCount:pageCount,status:status,featured:featured,search:search}})
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

      getPublicNewsList({commit},{url = null} = {}) {
        commit("setNewsLoading", true);
        url = url || '/news-list/'
        return axiosClient
        .get(url, {params:{article_type_id:1}})
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

      getFeaturedNewsList({commit},{url = null} = {}) {
        commit("setFeaturedNewsLoading", true);
        url = url || '/featured-news-list/'
        return axiosClient
        .get(url, {params:{article_type_id:1}})
        .then((res)=>{
          commit("setFeaturedNews",res.data);
          commit("setFeaturedNewsLoading", false);
          console.log(res.data)
          return res;
        })
        .catch((err)=>{
          commit("setFeaturedNewsLoading", false);
          throw err;
        })
      },

      getNewsBySlug({commit}, slug) {
        commit("setCurrentNewsLoading", true);
        return axiosClient
        .get(`/news-by-slug/${slug}`)
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
    },
    mutations: {
      setFeaturedNewsLoading: (state, loading) => {
        state.featuredNewsList.loading = loading;
      },
      setFeaturedNews: (state, news)=>{
        state.featuredNewsList.data = news.data;
        state.featuredNewsList.links = news.meta.links;
      },
      setNewsLoading: (state, loading) => {
        state.newsList.loading = loading;
      },
      setNews: (state, news)=>{
        state.newsList.data = news.data;
        state.newsList.links = news.meta.links;
      },
      setCurrentNewsLoading: (state, loading) => {
        state.currentNews.loading = loading;
      },
      setCurrentNews: (state, news)=>{
        state.currentNews.data = news.data;
      },

      // SET STORIES
      setFeaturedStoryLoading: (state, loading) => {
        state.featuredStoryList.loading = loading;
      },
      setFeaturedStory: (state, story)=>{
        state.featuredStoryList.data = story.data;
        state.featuredStoryList.links = atory.meta.links;
      },
      setStoryLoading: (state, loading) => {
        state.storyList.loading = loading;
      },
      setStory: (state, story)=>{
        state.storyList.data = story.data;
        state.storyList.links = story.meta.links;
      },
      setCurrentStoryLoading: (state, loading) => {
        state.currentStory.loading = loading;
      },
      setCurrentStory: (state, story)=>{
        state.currentStory.data = story.data;
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
    modules: {}
  }
)

export default store;
