
const mutations =  {
    SET_CURRENT_LOADING: (state, loading) => {
        state.current.loading = loading;
      },
    SET_CURRENT: (state, gallery)=>{
      state.current.data = gallery.data;
      // state.current_article.links = article.meta.links;
    },

    SET_LIST: (state, gallery)=>{
      state.list.data = gallery.data;
      state.list.links = gallery.meta.links;
    },
    SET_LIST_LOADING: (state, loading) => {
        state.list.loading = loading;
    },
  }

 export default mutations;
