const Form = () => import("./Form.vue");
const Table = () => import("./Table.vue");
const childRoutes =[ {
          path: "list",
          component: Table,
          name: "CarouselTable",
          meta: {title:"List"}
        },
        {
          path: "new-slide",
          component: Form,
          name: "AddSlide",
          meta: {title:"Add Slide"}
        },
        {
          path: ":id/update",
          component: Form,
          name: "UpdateSlide",
          meta: {title:"Update Slide"}
        }];

export default childRoutes;
