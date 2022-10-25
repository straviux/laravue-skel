export default {

  getNewsList({commit},{url = null} = {}) {
        commit("setNewsLoading", true);
        url = url || '/articles/'
        return axiosClient
        .get(url)
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
        .get(url)
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
        .get(url)
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
}


