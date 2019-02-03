<template>
    <div>
      <h2 class="">Пополнение баланса</h2>
      <form name="login_form" @submit="balanceup">
        <input type="number" placeholder="Сумма пополнения" name="amount" v-model="amount" required>
        <input type="submit" value="Пополнить">
      </form>
    </div>
</template>

<script>
import { HTTP } from '@/requests/requests.js'

export default {
  name: "Balanceup",
  data () {
    return {
      amount: "50",
    }
  },
  methods: {
    balanceup: function(e) {
      e.preventDefault();
      const body = JSON.stringify({ balanceChange: this.amount })
      HTTP.post('/user/balanceUp', body)
      .then(res => {
        if(res.status === 200) {
          
          this.$store.dispatch("getUserData");

          const props = { isOpen: false };
          this.$store.commit("updatePopup", props);
        }
      })
      .catch(e => {
        this.isError = true;
      })
      
    }
  }
  
};
</script>