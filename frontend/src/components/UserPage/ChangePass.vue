<template>
    <div class="change_pass">
      <form @submit="changePass">
        <input type="password" placeholder="Введите старый пароль" v-model="pass1" name="pass1" required/>
        <input type="password" placeholder="Введите новый пароль" v-model="pass2" name="pass2" required/>

        <input type="submit" value="Изменить"/>
      </form>
    </div>
</template>

<script>
import { HTTP } from '@/requests/requests.js'

export default {
  name: "changePass",
  data() {
    return {
      pass1: '',
      pass2: '',

    }
  },
  computed: {

  },
  methods: {
    changePass: function(e) {
      e.preventDefault();
      const body = JSON.stringify({ oldPassword: this.pass1, newPassword: this.pass2 })
      HTTP.post('/user/changePassword', body)
      .then(res => {
        const result = res.status === 500 ? 'pass error' : 'pass changed'
        console.log(result)
      })
      .catch(e => {
        this.isError = true;
      })
      console.log(e);
    }
  }
  
};
</script>
<style scoped lang="less">
  
</style>