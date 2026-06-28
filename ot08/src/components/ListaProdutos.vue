<template>
  <div>
    <h2>Produtos</h2>
    <p v-if="store.loading" style="color: gray;">Carregando produtos...</p>
    <p v-if="store.erro" style="color: red;">{{ store.erro }}</p>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;">
      <div
        v-for="produto in store.produtos"
        :key="produto.id"
        style="border: 1px solid #ddd; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; align-items: center; gap: 8px;"
      >
        <img :src="produto.image" :alt="produto.title" style="width: 80px; height: 80px; object-fit: contain;" />
        <p style="font-size: 13px; text-align: center; flex: 1;">{{ produto.title }}</p>
        <p style="font-weight: bold;">R$ {{ produto.price.toFixed(2) }}</p>
        <button
          @click="carrinho.adicionarProduto(produto)"
          style="padding: 6px 12px; background: #42b983; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Adicionar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useProdutoStore } from '@/stores/produtoStore'
import { useCarrinhoStore } from '@/stores/carrinhoStore'

export default {
  setup() {
    const store = useProdutoStore()
    const carrinho = useCarrinhoStore()
    store.carregarProdutos()
    return { store, carrinho }
  }
}
</script>
