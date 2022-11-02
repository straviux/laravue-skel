import axiosClient from "../../../axios";
const actions = {
  getById({commit}, id) {
        commit("SET_CURRENT_LOADING", true);
        return axiosClient
        .get(`/carousels/${id}`)
        .then((res)=>{
          commit("SET_CURRENT",res.data);
          commit("SET_CURRENT_LOADING", false);
          console.log(res.data)
          return res;
        })
        .catch((err)=>{
          commit("SET_CURRENT_LOADING", false);
          throw err;
        })
      },
  getList({commit},{url = null} = {}) {
        commit("SET_LIST_LOADING", true);
        url = url || '/carousels/'
        return axiosClient
        .get(url)
        .then((res)=>{
          commit("SET_LIST",res.data);
          commit("SET_LIST_LOADING", false);
          console.log(res.data)
          return res;
        })
        .catch((err)=>{
          commit("SET_LIST_LOADING", false);
          throw err;
        })
      },

  getPublic({commit},{url = null} = {}) {
        commit("SET_LIST_LOADING", true);
        url = url || '/carousel-list/'
        return axiosClient
        .get(url)
        .then((res)=>{
          commit("SET_LIST",res.data);
          commit("SET_LIST_LOADING", false);
          console.log(res.data)
          return res;
        })
        .catch((err)=>{
          commit("SET_LIST_LOADING", false);
          throw err;
        })
      },



  saveSlide({commit},slide){
        delete slide.slide_url;
        let response;
        if(slide.id) {
          response = axiosClient.put(`/carousels/${slide.id}`, slide)
          .then((res)=>{
            commit("SET_CURRENT", res.data);
            return res;
          })
        } else {
          response = axiosClient.post("/carousels", slide).then((res)=>{
            commit("SET_CURRENT", res.data);
            return res;
          })
        }
        return response;
  },
}

export default actions
