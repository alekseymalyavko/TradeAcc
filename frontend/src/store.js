import Vue from "vue";
import Vuex from "vuex";
import { HTTP } from '@/requests/requests'
import cookie from 'vue-cookie'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthorized: Boolean(cookie.get('Authorization')),
    User: { username: '', email: '', balance: '' },
    Popup: { isOpen: false, isError: false, component: "Signup" },
  },
  getters: {
    isAuthorized(state) {
      return state.isAuthorized
    },
    getUser(state) {
      return state.User
    },
    getPopup(state) {
      return state.Popup
    },
  },
  mutations: {
    updateAuth(state, props) {
      state.isAuthorized = props
    },
    updateUser(state, props) {
      state.User.username = props.username;
      state.User.email = props.email;
      state.User.balance = props.balance;
    },
    updatePopup(state, props) {
      state.Popup.isOpen = props.isOpen;
      state.Popup.isError = props.isError;
      state.Popup.component = props.component;
    },
  },
  actions: {
    getUserData({commit}) {
      HTTP.get('/user')
      .then(res => {
        if(res.data) {
          commit('updateAuth', true)
          commit('updateUser', res.data)
        }
      })
      .catch(e => {
        console.log(e);
      })
    }
  }
});
