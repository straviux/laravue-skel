const Module = () => import("./Module.vue");
const Dashboard = () => import("./components/Dashboard.vue");
const NewsMaintenance = () => import("./components/NewsMaintenance.vue");
const StoryMaintenance = () => import("./components/StoryMaintenance.vue");
import newsRoutes from "./components/news/news-routes";
import storyRoutes from "./components/stories/story-routes";

const routes = {
  path: "/admin",
  redirect: { name: 'Dashboard' },
  meta: { requiresAuth: true },
  component: Module, // Default Layout
  children: [
    {
      path: "dashboard",
      component: Dashboard,
      name: "Dashboard",
      meta: {title:'Dashboard'}
    },{
      path: "news-maintenance",
      redirect: {name:"NewsList"}, //imported from from new-routes
      component: NewsMaintenance,
      name: "NewsMaintenance",
      children:newsRoutes
    }
    ,{
      path: "stories-maintenance",
      redirect: {name:"StoryList"}, //imported from from new-routes
      component: StoryMaintenance,
      name: "StoryMaintenance",
      children:storyRoutes
    }

    ,{
      path: "resolutions-maintenance",
      // redirect: {name:"StoryList"}, //imported from from new-routes
      component: StoryMaintenance,
      name: "ResolutionMaintenance",
      // children:storyRoutes
    }

    ,{
      path: "events-maintenance",
      // redirect: {name:"StoryList"}, //imported from from new-routes
      component: StoryMaintenance,
      name: "EventsMaintenance",
      // children:storyRoutes
    }
  ]
};

export default routes;
