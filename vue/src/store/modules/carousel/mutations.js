
const mutations =  {
    SET_CURRENT_LOADING: (state, loading) => {
        state.current.loading = loading;
      },
    SET_CURRENT: (state, article)=>{
      state.current.data = article.data;
      // state.current_article.links = article.meta.links;
    },

    SET_LIST: (state, article)=>{
      state.list.data = article.data;
      state.list.links = article.meta.links;
    },
    SET_LIST_LOADING: (state, loading) => {
        state.list.loading = loading;
    },
  }

 export default mutations;
