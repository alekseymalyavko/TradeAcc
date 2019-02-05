import Vue from "vue";
import Vuex from "vuex";
import { HTTP } from '@/requests/requests'
import cookie from 'vue-cookie'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthorized: Boolean(cookie.get('Authorization')),
    User: { username: '', email: '', balance: '', Ads:[], },
    Popup: { isOpen: false, isError: false, component: "Signup" },
    Ads: [],
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
    getUserAds(state) {
      return state.User.Ads
    },
    getAds(state) {
      return state.Ads
    },
  },
  mutations: {
    updateAuth(state, props) {
      state.isAuthorized = props;
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
    updateUserAds(state, props) {
      state.User.Ads = props;
    },
    updateAds(state, props) {
      state.Ads = props;
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
        return e
      })
    },
    getUserAdsData({commit}) {
      HTTP.get('/user/ads')
      .then(res => {
        if(res.data) {
          commit('updateUserAds', res.data)
        }
      })
      .catch(e => {
        return e
      })
    },
    getAdsData({commit}, props) {
      let page = props.page;
      let perPage = props.perPage;
      HTTP.get('/ads', {
        params: {
          page,
          perPage,
        }
      })
      .then(res => {
        if(res.data) {
          commit('updateAds', res.data )
        }
      })
      .catch(e => {
        return e
      })
    },
    
  }
});
