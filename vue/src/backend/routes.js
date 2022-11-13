const Module = () => import("./Module.vue");
const Dashboard = () => import("./components/Dashboard.vue");
const NewsMaintenance = () => import("./components/NewsMaintenance.vue");
const StoryMaintenance = () => import("./components/StoryMaintenance.vue");
const CarouselMaintenance = () => import("./components/CarouselMaintenance.vue");
const GalleryMaintenance = () => import("./components/GalleryMaintenance.vue")
import newsRoutes from "./components/news/news-routes";
import storyRoutes from "./components/stories/story-routes";
import carouselRoutes from "./components/carousel/routes.js";
import galleryRoutes from "./components/gallery/routes";

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
      path: "carousel-maintenance",
      redirect: {name:"CarouselTable"},
      component: CarouselMaintenance,
      name: "CarouselMaintenance",
      children:carouselRoutes
    }
    ,{
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
    ,{
      path: "gallery-maintenance",
      redirect: {name:"GalleryTable"}, //imported from from new-routes
      component: GalleryMaintenance,
      name: "GalleryMaintenance",
      children:galleryRoutes
    }
  ]
};

export default routes;
