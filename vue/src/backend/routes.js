const Module = () => import("./Module.vue");
const Dashboard = () => import("./components/Dashboard.vue");
const NewsMaintenance = () => import("./components/NewsMaintenance.vue");
import childRoutes from "./components/news/news-routes";

const routes = {
  path: "/admin",
  redirect: { name: 'Dashboard' },
  component: Module, // Default Layout
  children: [
    {
      path: "dashboard",
      component: Dashboard,
      name: "Dashboard"
    },{
      path: "news-maintenance",
      redirect: {name:"NewsList"}, //imported from from new-routes
      component: NewsMaintenance,
      name: "NewsMaintenance",
      children:childRoutes
    }
  ]
};

export default routes;
