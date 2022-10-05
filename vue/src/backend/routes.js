const Module = () => import("./Module.vue");
const Dashboard = () => import("./components/Dashboard.vue");
const NewsMaintenance = () => import("./components/NewsMaintenance.vue");
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
      component: NewsMaintenance,
      name: "NewsMaintenance"
    }
  ]
};

export default routes;
