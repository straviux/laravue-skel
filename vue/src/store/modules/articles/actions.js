import axiosClient from "../../../axios";
const actions = {
  getById({commit}, id) {
        commit("SET_CURRENT_LOADING", true);
        return axiosClient
        .get(`/articles/${id}`)
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
  getList({commit},{url = null,article_type_id=null,pageCount=null,status=null,featured=null, search=null} = {}) {
        commit("SET_LIST_LOADING", true);
        url = url || '/articles/'
        return axiosClient
        .get(url,{params:{article_type_id:article_type_id,pageCount:pageCount,status:status,featured:featured,search:search}})
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

  getSlug({commit}, slug) {
        commit("SET_CURRENT_LOADING", true);
        return axiosClient
        .get(`/article-by-slug/${slug}`)
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

  getPublicList({commit},{url = null,article_type_id=null,pageCount=null,status=null,featured=null, search=null} = {}) {
    commit("SET_LIST_LOADING", true);
    url = url || '/articles-public/'
    return axiosClient
      .get(url,{params:{article_type_id:article_type_id,pageCount:pageCount,featured:featured,search:search}})
      .then((res)=>{
        if(featured==1){
          commit("SET_FEATURED",res.data);
          commit("SET_FEATURED_LOADING", false)
        } else {
          commit("SET_LIST",res.data);
          commit("SET_LIST_LOADING", false);
        }
        console.log(res.data)
        return res;
      })
      .catch((err)=>{
        commit("SET_LIST_LOADING", false);
        throw err;
      })
  },

  saveArticle({commit},article){
        delete article.cover_photo_url;
        let response;
        if(article.id) {
          response = axiosClient.put(`/articles/${article.id}`, article)
          .then((res)=>{
            commit("SET_CURRENT", res.data);
            return res;
          })
        } else {
          response = axiosClient.post("/articles", article).then((res)=>{
            commit("SET_CURRENT", res.data);
            return res;
          })
        }
        return response;
  },
}

export default actions
