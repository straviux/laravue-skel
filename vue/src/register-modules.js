import router from "./router";
// import store from "./store";

const registerModule = (name, module) => {
  // console.log(module)
  // if (module.store) {
  //   store.registerModule(name, module.store);
  // }

  if (module.routes) {

    router.addRoute(module.routes);
  }
};

export const registerModules = modules => {
  Object.keys(modules).forEach(moduleKey => {
    const module = modules[moduleKey];
    registerModule(moduleKey, module);
  });
};
