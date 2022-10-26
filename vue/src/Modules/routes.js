// const Module = () => import("./Module.vue");
const DefaultLayout = () => import("./DefaultLayout.vue");
import Home from "./home/Home.vue";
import News from "./news/News.vue";
import newsRoutes from "./news/news-routes";
import NotFound from "../views/NotFound.vue"

const routes = {
    path: '/',
    // meta: {isGuest: true},
    name:  'Public',
    component: DefaultLayout,
    children: [
      {
          path: "",
          component: Home,
          name: "Home",
          meta: {title:'Home'},
      },

      // newsRoutes
      {
        path: "news",
        redirect: {name:"PublicNewsList"}, //imported from from new-routes
        component: News,
        name: "NewsModule",
        meta: {title:'News List'},
        children:newsRoutes
      },
      {
        path: "stories",
        component: Home,
        name: "PublicStoryList",
        meta: {title:'Stories'},
      },
      {
        path: "events",
        component: Home,
        name: "PublicEventsList",
        meta: {title:'Events'},
      },


      {
        path: "page-not-found",
        component: NotFound,
        meta: {title:'Page Not Found'},
        name: "NotFound"
      }
    ]
};

export default routes;
