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
      path: "/student",
      name: "Explore",
      routes: [
        {
          path: "/:adventure",
          name: "Adventure",
          props: true,
          routes: [
            {
              path: "/:task",
              name: "Task",
              props: true,
              component: () => import("./views/Task.vue")
            }
          ],
          component: () => import("./views/Adventure.vue")
        }
      ],
      component: () => import("./views/Explore.vue")
    },
    {
      path: "/teacher",
      name: "Teacher",
      component: () => import("./views/Teacher.vue")
    }
  ]
});
