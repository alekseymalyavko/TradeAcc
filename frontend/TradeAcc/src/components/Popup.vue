<template>
  <div class="popup_wrapper">
    <div class="form" :class="{ warning: isError }">
      <span class="close_button" @click="close">×</span>
      <p class="warning_message" v-if="isError">Неверные данные</p>

      <Signup v-if="component === 'Signup' "/>
      <Login v-if="component === 'Login' "/>

    </div>
  </div>
</template>

<script>
import Signup from "./Signup.vue";
import Login from "./Login.vue";


export default {
  name: "Popup",
  components: {
    Signup,
    Login,
  },
  computed: {
    isError() {
      return this.$store.getters.getPopup.isError
    },
    component() {
      return this.$store.getters.getPopup.component
    }
  },
  methods: {
    close: function() {
      const props = { isOpen: false, isError: false, component: false };
      this.$store.dispatch("openPopup", props);
    }
  },
  
};
</script>

<style scoped lang="less">
  .popup {
    &_wrapper {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: #00000085;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .form {
    display: block;
    margin: auto;
    width: 400px;
    min-height: 200px;
    background: #F7F7F7;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #b9b9b9;
    position: relative;
    padding-top: 50px;

    h2 {
      font-size: 18px;
      position: absolute;
      top: 0;
      width: 100%;
      padding-bottom: 10px;
      border-bottom: 1px solid #E5E6E8;
    }

    &.warning {
      border: 1px solid red;
    }
    .warning_message {
      color: red;
    }
  }

  .close_button {
    position: absolute;
    top: 0;
    right: 0;
    line-height: 0.6;
    font-size: 40px;
    padding: 5px;
    cursor: pointer;
    z-index: 99;
  }
</style>
