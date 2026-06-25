<template>
  <footer>
    <p>{{ texto }}</p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      texto: '© 2025 - UniSENAI Vue.js'
    }
  }
}
</script>

<style scoped>
footer { background: #ecf0f1; text-align: center; padding: 12px; margin-top: 30px; color: #555; }
</style>
