<template>
  <div>
    <form name="add_rec" @submit="addComment">
      <input type="text" placeholder="Ваш комментарий" name="message" v-model="message">
      <input type="submit" value="Отправить">
    </form>
  </div>
</template>

<script>
import { HTTP } from '@/requests/requests.js'

export default {
  name: "AdAddComments",
  data() {
    return {
      message: '',
    }
  },
  props: {
    adID: String
  },
  methods: {
    addComment: function(e) {
      e.preventDefault();

      const body = JSON.stringify({ message: this.message })
      HTTP.post(`/ads/${this.adID}/comments`, body)
      .then(res => {
        if(res.status === 200) {
          console.log("Коммент отправлен");
          this.message = '';
          this.$store.dispatch("getCurrentAdCommentsData", this.adID);
        }
      })
      .catch(e => {
        this.isError = true;
      })
    }
  }
  
};
</script>
<style scoped lang="less">
  
</style>