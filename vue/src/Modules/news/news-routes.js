const NewsView = () => import("./NewsView.vue");
const NewsList = () => import("./NewsList.vue");
const newsRoutes =[ {
          path: ":pagenum?",
          component: NewsList,
          name: "PublicNewsList",
        },
        {
          path: ":slug",
          component: NewsView,
          name: "ViewNews",
        }];

export default newsRoutes;
