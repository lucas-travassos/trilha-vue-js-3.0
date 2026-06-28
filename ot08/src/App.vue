<template>
  <div style="max-width: 1100px; margin: 40px auto; padding: 0 20px; font-family: sans-serif;">
    <h1>Loja Virtual</h1>
    <div style="display: grid; grid-template-columns: 1fr 350px; gap: 32px;">
      <ListaProdutos />
      <Carrinho />
    </div>
  </div>
</template>

<script>
import ListaProdutos from '@/components/ListaProdutos.vue'
import Carrinho from '@/components/Carrinho.vue'

export default {
  components: { ListaProdutos, Carrinho }
}
</script>
