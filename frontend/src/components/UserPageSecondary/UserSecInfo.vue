<template>
  <div class="user_page_personal">
    <div class="personal_name">Профиль: {{secondaryUserData.username}}</div>
    <div class="personal_email">Почта: {{secondaryUserData.email}}</div>
    <div class="personal_balance">Баланс: {{secondaryUserData.balance}}</div>
    <div class="personal_phone">Телефон: </div>
    <div class="personal_social">Ссылки социальные сети: </div>
  </div>
</template>

<script>

export default {
  name: "UserSecInfo",
  computed: {
    secondaryUserData() {
      return this.$store.getters.getSecondaryUser
    },
  },
};
</script>
<style scoped lang="less">
  
</style>