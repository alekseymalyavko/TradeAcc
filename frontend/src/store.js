import Vue from "vue";
import Vuex from "vuex";
import { HTTP } from '@/requests/requests'
import cookie from 'vue-cookie'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthorized: Boolean(cookie.get('Authorization')),
    Popup: { isOpen: false, isError: false, component: "Signup" },
    User: { Personal: { username: '', email: '', balance: ''} , Ads:[], Comments:[] },
    SecondaryUser: { Personal: {}, Ads:[], Comments:[] },
    Ads: [],
    CurrentAd: { AdData: {}, Comments:[] },
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
      return state.User.Personal
    },
    getUserAds(state) {
      return state.User.Ads
    },
    getUserComments(state) {
      return state.User.Comments
    },

    //Ads
    getAds(state) {
      return state.Ads
    },
    getCurrentAd(state) {
      return state.CurrentAd.AdData
    },
    getCurrentAdComments(state) {
      return state.CurrentAd.Comments
    },

    //SecondaryUser    
    getSecondaryUser(state) {
      return state.SecondaryUser.Personal
    },
    getSecondaryUserAds(state) {
      return state.SecondaryUser.Ads
    },
    getSecondaryUserComments(state) {
      return state.SecondaryUser.Comments
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
      state.User.Personal.username = props.username;
      state.User.Personal.email = props.email;
      state.User.Personal.balance = props.balance;
    },
    updateUserAds(state, props) {
      state.User.Ads = props;
    },
    updateUserComments(state, props) {
      state.User.Comments = props;
    },

    //Ads
    updateAds(state, props) {
      state.Ads = props;
    },
    updateCurrentAd(state, props) {
      state.CurrentAd.AdData = props;
    },
    updateCurrentAdComments(state, props) {
      state.CurrentAd.Comments = props;
    },

    //secondaryUser
    updateSecondaryUser(state, props) {
      state.SecondaryUser.Personal = props;
    },
    updateSecondaryUserAds(state, props) {
      state.SecondaryUser.Ads = props;
    },
    updateSecondaryUserComments(state, props) {
      state.SecondaryUser.Comments = props;
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
    getUserCommentsData({commit}) {
      const username = this.state.User.Personal.username;
      HTTP.get(`/user/${username}/comments`)
      .then(res => {
        if(res.data) {
          commit('updateUserComments', res.data)
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
    getCurrentAdCommentsData({commit}, props) {
      let adID = props;
      HTTP.get(`/ads/${adID}/comments`)
      .then(res => {
        if(res.data) {
          commit('updateCurrentAdComments', res.data )
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
    getSecondaryUserCommentsData({commit}, props) {
      const username = props;
      HTTP.get(`/user/${username}/comments`)
      .then(res => {
        if(res.data) {
          commit('updateSecondaryUserComments', res.data)
        }
      })
      .catch(e => {
        return e
      })
    },
    
  }
});
