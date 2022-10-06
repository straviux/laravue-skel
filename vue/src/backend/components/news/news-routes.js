const NewsForm = () => import("./NewsForm.vue");
const NewsList = () => import("./NewsList.vue");
const childRoutes =[ {
          path: "list",
          component: NewsList,
          name: "NewsList",
          meta: {name:"list"}
        },
        {
          path: "write-news",
          component: NewsForm,
          name: "WriteNews",
          meta: {name:"write"}
        },
        {
          path: ":id/update",
          component: NewsForm,
          name: "UpdateNews",
          meta: {name:"update"}
        }];

export default childRoutes;
