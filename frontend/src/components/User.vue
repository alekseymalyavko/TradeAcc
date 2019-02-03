<template>
    <div class="user">
      <div class="user_img">IMG</div>
      <div class="user_info" :class="{ active: isOpen}">
        <div class="user_info_name" @click="openInfo">{{userData.username}}</div>
        
        <div class="user_info_more">
          <span><router-link to="/user">Личный кабинет</router-link></span>
          <span @click="balanceUp">Баланс {{userData.balance}}</span>
          <span>Мои объявления</span>
          <span @click="exit">Выйти</span>
        </div>

      </div>
    </div>
</template>

<script>

export default {
  name: "User",
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    userData: function() {
      return this.$store.getters.getUser
    }
  },
  methods: {
    openInfo: function() {
      this.isOpen = this.isOpen === true ? false : true;
    },
    balanceUp: function() {
      const props = { isOpen: true, isError: false, component: "Balanceup" };
      this.$store.commit("updatePopup", props);
    },
    exit: function() {
      this.$store.state.isAuthorized = false;
      this.$store.commit('updateUser', {})
      this.$cookie.delete('Authorization');
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
    min-width: 170px;
    
    &_img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #41b883;
      border: 1px solid white;
      padding: 5px;
      margin: 0 10px;
      display: flex;
      align-items: center;
      color: #fff;
    }

    &_info {
      &_name {
        cursor: pointer;
        font-size: 20px;
        position: relative;
        padding-right: 25px;

        &:after {
          content: "";
          width: 12px;
          height: 12px;
          border-bottom: 1px solid #2c3e50;
          border-right: 1px solid #2c3e50;
          transform: rotate(45deg);
          position: absolute;
          right: 4px;
          top: 2px;
          transition: 0.4s;

        }
      }
      &_more {
        text-align: left;
        background: white;
        border-radius: 3px;
        position: absolute;
        top: 35px;
        left: 10px;
        border: 1px solid #80808073;
        font-size: 16px;
        margin-top: 10px;
        min-width: 145px;
        visibility: hidden;
        opacity: 0;
        transition: 0.4s;

        span {
          display: block;
          padding: 8px 5px;
          cursor: pointer;

          &:hover {
            background: #dadada;
          }

          &:last-child {
            border-top: 1px solid #e0dfdf;
            margin-top: 10px;
          }
        }
      }
    }

    &_info.active {
      .user_info_more {
        visibility: visible;
        opacity: 1;
      }
      .user_info_name {
        &:after {
          transform: rotate(-135deg);
          top: 10px;          
        }
      }
    }
  }
</style>