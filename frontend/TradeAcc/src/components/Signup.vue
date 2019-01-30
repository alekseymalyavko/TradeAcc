<template>
    <div>
      <h2 class="">Регистрация</h2>
      <form name="signup_form" @submit="signUp">
        <input type="text" placeholder="Логин" name="username" v-model="username" required>
        <input type="email" placeholder="Почта" name="email" v-model="email" required>
        <input type="password" placeholder="Пароль" name="password" v-model="password" required>
        <input type="password" placeholder="Повторите пароль" name="password1" v-model="password1" required>
        
        <label><input type="checkbox" name="rules" v-model="rules"> Accept rules & terms</label>

        <input type="submit" value="Зарегистрироваться">
      </form>
    </div>
</template>

<script>
import { AUTH, HTTP } from '@/requests/requests.js'

export default {
  name: "Signup",
  data () {
    return {
      email: "ivan@lol.com",
      username: "user",
      password: "1234",
      rules: true,
      password1: "1234",
    }
  },
  methods: {
    signUp: function(e) {
      e.preventDefault();
      const body = JSON.stringify({ username: this.username, email: this.email, password: this.password })
      AUTH.post('/account/signUp', body)
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