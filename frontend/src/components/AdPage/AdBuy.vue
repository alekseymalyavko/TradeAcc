<template>
  <form name="buy_acc" @submit="buyAcc">
    <input type="number" placeholder="" name="acc" v-model="adID" hidden>
    <input type="submit" value="Купить">
  </form>
</template>

<script>
import { HTTP } from '@/requests/requests.js'

export default {
  name: "AdBuy",
  props: {
    adID: String
  },
  methods: {
    buyAcc: function(e) {
      e.preventDefault();

      HTTP.put(`/ads/${this.adID}/buy`)
      .then(res => {
        if(res.status === 200) {
          console.log("Куплено")
        }
      })
      .catch(e => {
        this.isError = true;
      })
    },
  }
  
};
</script>
<style scoped lang="less">
  
</style>