<template>
    <div>
      <h2 class="">Вход</h2>
      <form name="login_form" @submit="login">
        <input type="text" placeholder="Логин" name="username" v-model="username" required>
        <input type="password" placeholder="Пароль" name="password" v-model="password" required>
        <input type="submit" value="Войти">
      </form>
    </div>
</template>

<script>
import { AUTH } from '@/requests/requests.js'

export default {
  name: "Login",
  data () {
    return {
      username: "user",
      password: "1234",
    }
  },
  methods: {
    login: function(e) {
      e.preventDefault();
      const body = JSON.stringify({ username: this.username, password: this.password })
      AUTH.post('/account/login', body)
      .then(res => {
        if(res.data) {
          console.log(res)
          // HTTP.defaults.headers['Authorization'] = `Bearer ${res.data.token}`;
        }
      })
      .catch(e => {
        this.isError = true;
      })
      
    }
  }
  
};
</script>