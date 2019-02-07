<template>
  <div id="app">
    <Header :isAuthorized="isAuthorized"/>

    <div class="container">
      <router-view />  
    </div>

    <Popup v-if="isOpen"/>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Popup from "@/components/Popup/Popup.vue";

export default {
  name: "App",
  components: {
    Header,
    Popup
  },
  computed:{
    isOpen() {
      return this.$store.getters.getPopup.isOpen
    },
    isAuthorized() {
      return this.$store.getters.isAuthorized
    }
  },
  created() {
    if (this.isAuthorized) {
      this.$store.dispatch("getUserData");
    }
  },
  methods: {

  }
};
</script>
<style lang="less">
  a {
    text-decoration: none;
    color: inherit;
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  form {
    display: flex;
    flex-direction: column;
    padding: 10px;
    text-align: left;
    max-width: 300px;

    input {
      margin: 10px 5px;
      padding: 10px 5px;
      font-size: 16px;
      border:none;
      border-radius: 2px;
      border-bottom: 1px solid;

      &[type="submit"] {
        margin: auto;
        margin-top: 35px;
        width: 45%;
        border:none;
        cursor: pointer;
      }
    }
  }
</style>
