<template>
  <div class="user_page_recall">
    {{userDataComments}}
    <div class="user_page_recall_item" v-if="!userDataComments">
      Нет отзывов
    </div>
    <div class="user_page_recall_item" v-else>
      Лучший хоть и гей 
    </div>
  </div>
</template>

<script>
import { HTTP } from '@/requests/requests.js'

export default {
  name: "UserRec",
  computed: {
    userDataComments: function() {
      return this.$store.getters.getUserComments[0]
    },
  },
  methods: {
    
  }
  
};
</script>
<style scoped lang="less">
  
</style>