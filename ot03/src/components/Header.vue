<template>
  <header>
    <h1>{{ titulo }}</h1>
  </header>
</template>

<script>
export default {
  data() {
    return {
      titulo: 'Trilha 03 - Componentes Vue'
    }
  }
}
</script>

<style scoped>
header { background: #2c3e50; color: white; padding: 16px 20px; }
h1 { margin: 0; font-size: 1.4em; }
</style>
