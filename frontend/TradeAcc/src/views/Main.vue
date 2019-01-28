<template>
  <div class="header">
    <img class="header_logo" alt="Vue logo" src="../assets/logo.png" />
    <div class="header_functional">
      <div class="header_functional_add" @click="createAd">Создать объявление</div>
      <div class="header_functional_login">
        <span class="LogIn" @click="logIn">Войти</span> / <span class="signUp" @click="signUp">Регистрация</span>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Main",
  components: {
    // HelloWorld
  },
  data() {
    return {
      data: 1
    }
  },
  methods: {
    logIn: function(e) {
      console.log("login")
    },
    signUp: function(e) {
      console.log("signUp")
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