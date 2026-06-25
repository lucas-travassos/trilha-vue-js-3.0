<template>
  <div class="pagina">
    <h2>Sobre</h2>
    <p>Esta aplicacao demonstra props, eventos, slots e mixins no Vue 3.</p>
    <p>{{ mensagemMixin }}</p>
    <button @click="mostrarMensagemMixin">Mixin tambem funciona aqui</button>
  </div>
</template>

<script>
import meuMixin from '../mixins/meuMixin.js'

export default {
  mixins: [meuMixin]
}
</script>

<style scoped>
.pagina { padding: 20px; }
button { padding: 6px 14px; cursor: pointer; background: #e67e22; color: white; border: none; border-radius: 4px; }
</style>
