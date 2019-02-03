import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
import UserPage from "./views/UserPage.vue";
import CreateAd from "./views/CreateAd.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Main
    },
    {
      path: "/user",
      name: "user",
      component: UserPage
    },
    {
      path: "/add",
      name: "add",
      component: CreateAd
    },
  ]
});
