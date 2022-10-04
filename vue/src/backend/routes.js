const Module = () => import("./Module.vue");
const Dashboard = () => import("./components/Dashboard.vue");
const routes = {
  path: "/admin",
  component: Module, // Default Layout
  children: [
    {
      path: "/",
      component: Dashboard,
      name: "Dashboard"
    }
  ]
};

export default routes;
