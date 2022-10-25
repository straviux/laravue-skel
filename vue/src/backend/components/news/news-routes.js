const NewsForm = () => import("./NewsForm.vue");
const NewsList = () => import("./NewsList.vue");
const childRoutes =[ {
          path: "list",
          component: NewsList,
          name: "NewsList",
          meta: {title:"News List"}
        },
        {
          path: "write-news",
          component: NewsForm,
          name: "WriteNews",
          meta: {title:"write News"}
        },
        {
          path: ":id/update",
          component: NewsForm,
          name: "UpdateNews",
          meta: {title:"update News"}
        }];

export default childRoutes;
