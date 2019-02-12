<template>
  <div class="user_page_recall">
    <div class="user_page_recall_item" v-if="!secondaryUserDataComments">
      Нет отзывов
    </div>
    <div class="user_page_recall_item" v-else v-for="item in secondaryUserDataComments" :key="item.id">
      <div>
        Пользователь: {{item.username}}
      </div>
      <div>
        Время: {{item.date}}
      </div>
      <div>
        Отзыв: {{item.message}}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "UserSecRec",
  computed: {
    secondaryUserDataComments: function() {
      return this.$store.getters.getSecondaryUserComments
    },
  },
  
};
</script>
<style scoped lang="less">
  .user_page_recall {
    text-align: left;
    
    &_item {
      padding: 20px;
    }
  }
</style>