import axios from 'axios'
import cookie from 'vue-cookie'

const token = cookie.get('Authorization');

export const AUTH = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    'Content-Type': 'application/json',
  }
})

export const HTTP = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
})