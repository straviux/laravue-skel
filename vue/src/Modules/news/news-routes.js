const NewsView = () => import("./NewsView.vue");
const NewsList = () => import("./NewsList.vue");
const newsRoutes =[ {
          path: ":pagenum?",
          component: NewsList,
          name: "PublicNews",
        },
        {
          path: ":slug",
          component: NewsView,
          name: "ViewNews",
        }];

export default newsRoutes;
