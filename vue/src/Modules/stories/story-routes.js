const StoryView = () => import("./StoryView.vue");
const StoryList = () => import("./StoryList.vue");
const storyRoutes =[ {
          path: ":pagenum?",
          component: StoryList,
          name: "PublicStoryList",
        },
        {
          path: ":slug",
          component: StoryView,
          name: "ViewStory",
        }];

export default storyRoutes;
