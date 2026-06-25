<template>
  <div class="card">
    <div class="card-header"><slot name="cabecalho">Cabecalho padrao</slot></div>
    <div class="card-body"><slot>Conteudo padrao</slot></div>
    <div class="card-footer"><slot name="rodape">Rodape padrao</slot></div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.card { border: 1px solid #ccc; border-radius: 8px; overflow: hidden; max-width: 400px; margin: 16px 0; }
.card-header { background: #2c3e50; color: white; padding: 10px 16px; font-weight: bold; }
.card-body { padding: 16px; }
.card-footer { background: #ecf0f1; padding: 10px 16px; font-size: 0.85em; color: #555; }
</style>
