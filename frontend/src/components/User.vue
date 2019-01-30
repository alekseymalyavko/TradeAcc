<template>
    <div class="user">
      <div class="user_img">IMG</div>
      <div class="user_info" :class="{ active: isOpen}">
        <div class="user_info_name" @click="openInfo">Ivan Petrov</div>
        
        <div class="user_info_more">
          <span>Личный кабинет</span>
          <span>Баланс</span>
          <span>Мои объявления</span>
          <span>Выйти</span>
        </div>

      </div>
    </div>
</template>

<script>

export default {
  name: "User",
  data() {
    return {
      isOpen: true
    }
  },
  methods: {
    openInfo: function() {
      this.isOpen = this.isOpen === true ? false : true;
    }
  }
  
};
</script>
<style scoped lang="less">
  .user {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &_img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: red;
      padding: 5px;
      margin: 0 10px;
    }

    &_info {

      &_more {
        text-align: left;
        background: white;
        border-radius: 3px;
        position: absolute;
        top: 35px;
        left: 10px;
        border: 1px solid #80808073;
        font-size: 16px;
        padding: 3px;
        margin-top: 10px;
        min-width: 145px;
        visibility: hidden;
        opacity: 0;
        transition: 0.4s;

        span {
          display: block;
          margin: 3px 5px;

          &:hover {
            color: #fff;
            background: grey;
          }

          &:last-child {
            margin-top: 15px;
          }
        }
      }
    }

    &_info.active {
      .user_info_more {
        visibility: visible;
        opacity: 1;
      }
    }
  }
</style>