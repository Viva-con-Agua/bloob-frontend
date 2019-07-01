import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Compose from "./views/Compose.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/compose",
      name: "compose",
      component: Compose
    },
    {
      path: "/mar",
      name: "mar",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/MAR.vue")
    },
    {
      path: "/read",
      name: "read",
      component: () => import("./views/Read.vue")
    },
    {
      path: "/read/detail",
      name: "detail",
      component: () => import("./views/ReadDetails.vue")
    }
  ]
});
