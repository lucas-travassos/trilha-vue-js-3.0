<template>
  <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px;">
    <h2>Carrinho ({{ store.totalItens }} itens)</h2>

    <p v-if="store.itens.length === 0" style="color: gray;">Carrinho vazio.</p>

    <div
      v-for="item in store.itens"
      :key="item.id"
      style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 12px;"
    >
      <img :src="item.image" :alt="item.title" style="width: 50px; height: 50px; object-fit: contain;" />
      <div style="flex: 1;">
        <p style="font-size: 13px; margin: 0;">{{ item.title }}</p>
        <p style="margin: 4px 0; font-size: 13px;">Qtd: {{ item.quantidade }} × R$ {{ item.price.toFixed(2) }}</p>
      </div>
      <button
        @click="store.removerProduto(item.id)"
        style="padding: 4px 8px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer;"
      >
        Remover
      </button>
    </div>

    <div v-if="store.itens.length > 0" style="margin-top: 16px; font-size: 18px; font-weight: bold;">
      Total: R$ {{ store.total }}
    </div>
  </div>
</template>

<script>
import { useCarrinhoStore } from '@/stores/carrinhoStore'

export default {
  setup() {
    const store = useCarrinhoStore()
    return { store }
  }
}
</script>
