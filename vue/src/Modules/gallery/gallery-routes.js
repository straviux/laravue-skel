const GalleryView = () => import("./View.vue");
const GalleryList = () => import("./List.vue");
const galleryRoutes =[ {
          path: ":pagenum?",
          component: GalleryList,
          name: "PublicGallery",
        },
        {
          path: ":slug",
          component: GalleryView,
          name: "ViewGallery",
        }];

export default galleryRoutes;
