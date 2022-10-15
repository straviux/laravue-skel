const NewsView = () => import("./NewsView.vue");
const NewsList = () => import("./NewsList.vue");
const newsRoutes =[ {
          path: ":pagenum?",
          component: NewsList,
          name: "PublicNewsList",
          meta: {name:"list"}
        },
        {
          path: ":slug",
          component: NewsView,
          name: "ViewNews",
          meta: {name:"update"}
        }];

export default newsRoutes;
