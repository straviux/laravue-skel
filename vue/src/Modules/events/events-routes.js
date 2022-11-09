const EventsView = () => import("./EventsView.vue");
const EventsList = () => import("./EventsList.vue");
const eventsRoutes =[ {
          path: ":pagenum?",
          component: EventsList,
          name: "PublicEvents",
        },
        {
          path: ":slug",
          component: EventsView,
          name: "ViewEvent",
        }];

export default eventsRoutes;
