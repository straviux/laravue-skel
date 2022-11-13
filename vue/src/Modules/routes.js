// const Module = () => import("./Module.vue");
const DefaultLayout = () => import("./DefaultLayout.vue");
import Home from "./home/Home.vue";
import News from "./news/News.vue";
import Stories from "./stories/Story.vue";
import Events from "./events/Events.vue";
import Gallery from "./gallery/Gallery.vue";
import newsRoutes from "./news/news-routes";
import storyRoutes from "./stories/story-routes";
import eventsRoutes from "./events/events-routes";
import galleryRoutes from "./gallery/gallery-routes";

import NotFound from "../views/NotFound.vue";

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
        redirect: {name:"PublicNews"}, //imported from from new-routes
        component: News,
        name: "NewsModule",
        meta: {title:'News'},
        children:newsRoutes
      },


      // newsRoutes
      {
        path: "stories",
        redirect: {name:"PublicStory"}, //imported from from story-routes
        component: Stories,
        name: "StoryModule",
        meta: {title:'Stories'},
        children:storyRoutes
      },

      {
        path: "events",
        component: Events,
        name: "PublicEvents",
        meta: {title:'Events'},
        children: eventsRoutes
      },

      {
        path: "gallery",
        component: Gallery,
        name: "PublicGallery",
        meta: {title:'Gallery'},
        children: galleryRoutes
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
