<template>
  <div class="header">
    <img class="header_logo" alt="Vue logo" src="../assets/logo.png" />
    <div class="header_functional">
      <!---<div class="header_functional_add" @click="createAd">Создать объявление</div>-->
      <div class="header_functional_login" v-if="!isAuthorized">
        <span class="LogIn" @click="logIn">Войти</span> / <span class="signUp" @click="signUp">Регистрация</span>
      </div>
    </div>

    <User v-if="isAuthorized"/>

  </div>
</template>

<script>
import User from "./User.vue";

export default {
  name: "Header",
  components: {
    User
  },
  computed: {
    
  },
  props: {
    isAuthorized: Boolean
  },
  methods: {
    logIn: function() {
      const props = { isOpen: true, isError: false, component: "Login" };
      this.$store.commit("updatePopup", props);
    },
    signUp: function(e) {
      const props = { isOpen: true, isError: false, component: "Signup" };
      this.$store.commit("updatePopup", props);
    },
    createAd: function(e) {
      console.log("createAd")
    }
  }
};
</script>

<style scoped lang="less">
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 25px;
    height: 65px;
    background: grey;

    &_logo {
      width: 40px;
      height: 40px;
    }

    &_functional {
      display: flex;

      &_add {
        cursor: pointer;
      }

      & > div {
        margin: 0 5px;

        & span {
          cursor: pointer;
        }
      }
    }
  }
</style>