import Vue from "vue";
import Vuex from "vuex";
// import { HTTP } from '@/request/http-common'
// import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    User: {},
    Popup: { isOpen: false, isError: false, component: "Signup" },
  },
  getters: {
    getUser(state) {
      return state.User
    },
    getPopup(state) {
      return state.Popup
    },
  },
  mutations: {
    updatePopup(state, props) {
      state.Popup.isOpen = props.isOpen;
      state.Popup.isError = props.isError;
      state.Popup.component = props.component;
    },
  },
  actions: {
    openPopup({ commit }, props) {
      commit('updatePopup', props);
    }
  }
});
