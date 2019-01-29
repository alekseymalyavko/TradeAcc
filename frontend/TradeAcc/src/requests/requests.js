import axios from 'axios'

export const AUTH = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    'Content-Type': 'application/json',
  }
})

export const HTTP = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer token`
  },
})