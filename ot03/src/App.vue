<template>
  <div id="app">
    <Header />
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">Sobre</router-link>
    </nav>
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: { Header, Footer }
}
</script>

<style>
body { font-family: Arial, sans-serif; padding: 0; margin: 0; }
nav { background: #2c3e50; padding: 10px 20px; }
nav a { color: white; margin-right: 12px; text-decoration: none; }
nav a.router-link-active { font-weight: bold; text-decoration: underline; }
</style>
