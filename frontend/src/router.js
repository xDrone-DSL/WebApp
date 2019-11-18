import Vue from "vue";
import Router from "vue-router";
import { socket } from "./apiCalls";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Root"
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/explore",
      name: "Explore",
      component: () => import("./views/Explore.vue")
    },
    {
      path: "/explore/:advId",
      name: "Adventure",
      props: true,
      component: () => import("./views/Adventure.vue")
    },
    {
      path: "/explore/:advId/:taskId",
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

export default router;
router.beforeEach((to, from, next) => {
  if (to.name === "Teacher") {
    next();
  } else if (!localStorage.uid && to.name !== "Login") {
    next("/login");
  } else if (to.name === "Root") {
    next("/explore");
  } else {
    socket.emit("IAM", { uid: localStorage.uid });
    socket.on("INVALID_I_AM", () => {
      localStorage.removeItem("uid");
      next("/login");
    });
    next();
  }
});
