<template>
  <div class="pagina">
    <h2>Sobre</h2>
    <p>Esta aplicação demonstra o uso de componentes Vue 3, incluindo props, eventos, slots e mixins.</p>
    <p>{{ mensagemMixin }}</p>
    <button @click="mostrarMensagemMixin">Mixin também funciona aqui</button>
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
button {
  padding: 6px 14px;
  cursor: pointer;
  background: #e67e22;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>