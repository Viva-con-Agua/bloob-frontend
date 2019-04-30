import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Compose from "./views/Compose.vue";
import Mosaico from "./views/Mosaico.vue";

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
      component: Compose,
      children: [
        {
          path: "/mosaico",
          name: "mosaicoModal",
          component: Mosaico
        }
      ]
    }
  ]
});
