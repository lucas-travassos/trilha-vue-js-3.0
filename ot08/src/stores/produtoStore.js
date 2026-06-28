import { defineStore } from 'pinia'
import axios from 'axios'

export const useProdutoStore = defineStore('produto', {
  state: () => ({
    produtos: [],
    loading: false,
    erro: ''
  }),
  actions: {
    async carregarProdutos() {
      this.loading = true
      this.erro = ''
      try {
        const res = await axios.get('https://fakestoreapi.com/products?limit=8')
        this.produtos = res.data
      } catch (err) {
        this.erro = 'Erro ao carregar produtos.'
      } finally {
        this.loading = false
      }
    }
  }
})
