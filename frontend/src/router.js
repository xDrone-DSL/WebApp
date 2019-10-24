import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/explore",
      name: "Explore",
      component: () => import("./views/Explore.vue")
    },
    {
      path: "/explore/:adventure",
      name: "Adventure",
      props: true,
      component: () => import("./views/Adventure.vue")
    },
    {
      path: "/explore/:adventure/:task",
      name: "Task",
      props: true,
      component: () => import("./views/Task.vue")
    },
    {
      path: "/teacher",
      name: "Teacher",
      component: () => import("./views/Teacher.vue")
    },
    {
      // Test simulator
      path: "/simulator",
      name: "Simulator",
      component: () => import("./components/Simulator.vue")
    }
  ]
});
