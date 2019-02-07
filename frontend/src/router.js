import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
import UserPage from "./views/UserPage.vue";
import UserPageSecondary from "./views/UserPageSecondary.vue";
import AdPage from "./views/AdPage.vue";
import CreateAd from "./views/CreateAd.vue";
import store from "./store";

Vue.use(Router);

const router = new Router({
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
    {
      path: "/user/:username",
      name: "SecondaryUserPage",
      component: UserPageSecondary,
    },
    {
      path: "/ads/:adId",
      name: "AdPage",
      component: AdPage,
    },
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthorized = store.state.isAuthorized;
  if (to.name === "add" && !isAuthorized) {
    const props = { isOpen: true, isError: false, component: "Login" };
    store.commit("updatePopup", props);
  } else {
    next()
  }

});

export default router;