import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    nome: localStorage.getItem('nome') || ''
  }),
  getters: {
    autenticado: (state) => !!state.token
  },
  actions: {
    login(token, nome) {
      this.token = token
      this.nome = nome
      localStorage.setItem('token', token)
      localStorage.setItem('nome', nome)
    },
    logout() {
      this.token = ''
      this.nome = ''
      localStorage.removeItem('token')
      localStorage.removeItem('nome')
    }
  }
})
