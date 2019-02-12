<template>
  <div class="ad_comments">
    <div class="ad_comments_item" v-for="item in currentAdCommentsData" :key="item.id">
      <div>Пользователь: {{item.username}}</div>
      <div>Время: {{item.date}}</div>
      <div>Комментарий: {{item.message}}</div>
    </div>
  </div>
</template>

<script>
import { HTTP } from '@/requests/requests.js'

export default {
  name: "AdComments",
  computed: {
    currentAdCommentsData() {
      return this.$store.getters.getCurrentAdComments
    },
  },
  methods: {
    
  }
  
};
</script>
<style scoped lang="less">
  .ad_comments {
    text-align: left;

    &_item {
      padding: 20px;
    }
  }
</style>