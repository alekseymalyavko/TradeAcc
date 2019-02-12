import Vue from "vue";
import Vuex from "vuex";
import { HTTP } from '@/requests/requests'
import cookie from 'vue-cookie'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthorized: Boolean(cookie.get('Authorization')),
    Popup: { isOpen: false, isError: false, component: "Signup" },
    User: { username: '', email: '', balance: '', Ads:[], },
    SecondaryUser: { UserData: {}, Ads:[], },
    Ads: [],
    CurrentAd: {},
  },
  getters: {
    isAuthorized(state) {
      return state.isAuthorized
    },
    getPopup(state) {
      return state.Popup
    },

    //User
    getUser(state) {
      return state.User
    },
    getUserAds(state) {
      return state.User.Ads
    },

    //Ads
    getAds(state) {
      return state.Ads
    },
    getCurrentAd(state) {
      return state.CurrentAd
    },

    //SecondaryUser    
    getSecondaryUser(state) {
      return state.SecondaryUser.UserData
    },
    getSecondaryUserAds(state) {
      return state.SecondaryUser.Ads
    },
  },
  mutations: {
    updateAuth(state, props) {
      state.isAuthorized = props;
    },
    updatePopup(state, props) {
      state.Popup.isOpen = props.isOpen;
      state.Popup.isError = props.isError;
      state.Popup.component = props.component;
    },

    //User
    updateUser(state, props) {
      state.User.username = props.username;
      state.User.email = props.email;
      state.User.balance = props.balance;
    },
    updateUserAds(state, props) {
      state.User.Ads = props;
    },

    //Ads
    updateAds(state, props) {
      state.Ads = props;
    },
    updateCurrentAd(state, props) {
      state.CurrentAd = props;
    },

    //secondaryUser
    updateSecondaryUser(state, props) {
      state.SecondaryUser.UserData = props;
    },
    updateSecondaryUserAds(state, props) {
      state.SecondaryUser.Ads = props;
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
    getCurrentAdData({commit}, props) {
      let adID = props;
      HTTP.get(`/ads/${adID}`)
      .then(res => {
        if(res.data) {
          commit('updateCurrentAd', res.data[0] )
        }
      })
      .catch(e => {
        return e
      })
    },


    getSecondaryUser({commit}, props) {
      let username = props;
      HTTP.get(`/user/${username}`)
      .then(res => {
        if(res.data) {
          commit('updateSecondaryUser', res.data )
        }
      })
      .catch(e => {
        return e
      })
    },
    getSecondaryUserAdsData({commit}, props) {
      let username = props;
      HTTP.get(`/user/${username}/ads`)
      .then(res => {
        if(res.data) {
          commit('updateSecondaryUserAds', res.data)
        }
      })
      .catch(e => {
        return e
      })
    },
    
  }
});
