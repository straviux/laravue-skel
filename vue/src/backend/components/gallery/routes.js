const Form = () => import("./Form.vue");
const Table = () => import("./Table.vue");
const childRoutes =[ {
          path: "list",
          component: Table,
          name: "GalleryTable",
          meta: {title:"List"}
        },
        {
          path: "new-slide",
          component: Form,
          name: "AddImage",
          meta: {title:"Add Image"}
        },
        {
          path: ":id/update",
          component: Form,
          name: "UpdateImage",
          meta: {title:"Update Image"}
        }];

export default childRoutes;
