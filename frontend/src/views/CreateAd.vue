<template>
  <div>
    CreateAd
    <form name="createAd_form" @submit="createAd">
      <input type="text" placeholder="Ссылка на сообщество" name="link" v-model="link" required>
      <input type="number" placeholder="Цена" name="price" v-model="price" required>
      <input type="textarea" placeholder="Описание" name="description" v-model="description" required>

      <input type="submit" value="Создать">
    </form>
  </div>
</template>

<script>
import { HTTP } from '@/requests/requests.js'


export default {
  name: "CreateAd",
  components: {

  },
  data () {
    return {
      link: "lol.by",
      price: 123,
      description: "Супер группа заработок 100к в секунду",
    }
  },
  computed:{

  },
  created() {

  },
  methods: {
    createAd: function(e) {
      e.preventDefault();
      const body = JSON.stringify({ description: this.description, link: this.link, price: this.price })
      HTTP.post('/ads/create', body)
      .then(res => {
        console.log(res.status)
      })
      .catch(e => {
        console.log(e)
      })
      
    }
  }
};
</script>

<style scoped lang="less">
  
</style>