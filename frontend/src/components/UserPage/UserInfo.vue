<template>
    <div class="user_page_personal">
      <div class="personal_name">Профиль: {{userData.username}}</div>
      <div class="personal_email">Почта: {{userData.email}}</div>
      <div class="personal_balance">Баланс: {{userData.balance}}</div>
      <div class="personal_phone">Телефон: </div>
      <div class="personal_social">Ссылки социальные сети: </div>
    </div>
</template>

<script>
import { HTTP } from '@/requests/requests.js'

export default {
  name: "UserInfo",
  computed: {
    userData: function() {
      return this.$store.getters.getUser
    },
  },
  methods: {
    
  }
  
};
</script>
<style scoped lang="less">
  
</style>