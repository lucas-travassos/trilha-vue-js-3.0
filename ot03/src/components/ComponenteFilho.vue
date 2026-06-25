<template>
  <div class="filho">
    <h2>Componente Filho</h2>
    <p v-if="mensagem">Mensagem recebida via prop: <strong>{{ mensagem }}</strong></p>
    <button @click="enviarParaPai">Enviar mensagem ao pai</button>
  </div>
</template>

<script>
export default {
  props: ['mensagem'],
  methods: {
    enviarParaPai() {
      this.$emit('mensagem-filho', 'Ola, pai! Mensagem do componente filho.')
    }
  }
}
</script>

<style scoped>
.filho { border: 2px dashed #3498db; padding: 16px; border-radius: 8px; margin-top: 12px; }
button { margin-top: 8px; padding: 6px 14px; cursor: pointer; background: #3498db; color: white; border: none; border-radius: 4px; }
</style>
