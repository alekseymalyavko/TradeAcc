<template>
  <div class="popup_wrapper">
    <div class="form">
      <span class="close_button"></span>
      <form name="popup">

      </form>

    </div>

  </div>
</template>

<script>


export default {
  name: "Popup",
  data () {
    return {
      data: 1
    }
  },
  props: {

  },
  methods: {

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
