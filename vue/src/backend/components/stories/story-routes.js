const StoryForm = () => import("./StoryForm.vue");
const StoryList = () => import("./StoryList.vue");
const childRoutes =[ {
          path: "list",
          component: StoryList,
          name: "StoryList",
          meta: {title:"Story List"}
        },
        {
          path: "write-story",
          component: StoryForm,
          name: "WriteStory",
          meta: {title:"write Story"}
        },
        {
          path: ":id/update",
          component: StoryForm,
          name: "UpdateStory",
          meta: {title:"Update Story"}
        }];

export default childRoutes;
