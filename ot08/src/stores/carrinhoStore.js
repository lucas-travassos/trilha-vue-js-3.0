import { defineStore } from 'pinia'

export const useCarrinhoStore = defineStore('carrinho', {
  state: () => ({
    itens: []
  }),
  getters: {
    total: (state) => {
      return state.itens.reduce((soma, item) => soma + item.price * item.quantidade, 0).toFixed(2)
    },
    totalItens: (state) => {
      return state.itens.reduce((soma, item) => soma + item.quantidade, 0)
    }
  },
  actions: {
    adicionarProduto(produto) {
      const existente = this.itens.find(i => i.id === produto.id)
      if (existente) {
        existente.quantidade++
      } else {
        this.itens.push({ ...produto, quantidade: 1 })
      }
    },
    removerProduto(id) {
      this.itens = this.itens.filter(i => i.id !== id)
    }
  }
})
