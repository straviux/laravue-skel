import axios from "axios";
import {createStore} from "vuex"
import axiosClient from "../axios"


const store = createStore(
  {
    state: {
      user: {
        data: {},
        token: sessionStorage.getItem('TOKEN')
      },
      dashboard: {
      loading: false,
      data: {}
      },
      events: {
        loading: false,
        links: [],
        data: []
      },
      currentEvent: {
        data: {},
        loading: false,
      },

    },
    getters: {},
    actions: {
      getUser({commit}) {
        return axiosClient.get('/user')
          .then(res => {
            console.log(res);
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

      getEvents({ commit }, {url = null} = {}) {
      commit('setEventsLoading', true)
      url = url || "/events";
      return axiosClient.get(url).then((res) => {
          commit('setEventsLoading', false)
          commit("setEvents", res.data);
          console.log(res.data);
          return res;
        });
      },
      getEvent({ commit }, id) {
        commit("setCurrentEventLoading", true);
        return axiosClient
          .get(`/events/${id}`)
          .then((res) => {
            commit("setCurrentEvent", res.data);
            commit("setCurrentEventLoading", false);
            return res;
          })
          .catch((err) => {
            commit("setCurrentEventLoading", false);
            throw err;
          });
      },
      saveEvent({ commit, dispatch }, event) {

      // delete event.image_url;

      let response;
      if (event.id) {
        response = axiosClient
          .put(`/events/${event.id}`, event)
          .then((res) => {
            commit('setCurrentEvent', res.data)
            return res;
          });
      } else {
        response = axiosClient.post("/events", event).then((res) => {
          commit('setCurrentEvent', res.data)
          return res;
        });
      }

      return response;
    },
    deleteEvent({ dispatch }, id) {
      return axiosClient.delete(`/events/${id}`).then((res) => {
        dispatch('getEvents')
        return res;
      });
    },

    },
    mutations: {

      logout: (state) => {
        state.user.token = null;
        state.user.data = {};
        sessionStorage.removeItem('TOKEN')
      },
      setUser: (state, user) => {
        state.user.data = user;
      },
      setToken: (state, token) => {
        state.user.token = token;
        sessionStorage.setItem('TOKEN', token);
      },

      setEventsLoading: (state, loading) => {
      state.events.loading = loading;
    },
    setEvents: (state, events) => {
      state.events.links = events.meta.links;
      state.events.data = events.data;
    },
    setCurrentEventLoading: (state, loading) => {
      state.currentEvent.loading = loading;
    },
    setCurrentEvent: (state, event) => {
      state.currentEvent.data = event.data;
    },
    },
    modules: {}
  }
)

export default store;
