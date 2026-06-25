<template>
  <div>
    <h3>Lista de Itens</h3>
    <ul>
      <li v-for="item in itens" :key="item.id">{{ item.id }}. {{ item.nome }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['itens']
}
</script>

<style scoped>
ul { padding-left: 20px; }
li { margin: 4px 0; }
</style>
