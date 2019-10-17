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
      name: "Student",
      component: () => import("./views/Student.vue")
    },
    {
      path: "/teacher",
      name: "Teacher",
      component: () => import("./views/Teacher.vue")
    }
  ]
});
