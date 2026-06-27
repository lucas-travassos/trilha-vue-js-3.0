<template>
  <div class="d-flex flex-column min-vh-100">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">Painel de Noticias</a>
        <button class="navbar-toggler" type="button" @click="menuAberto = !menuAberto">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div :class="['collapse', 'navbar-collapse', { show: menuAberto }]">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" :class="{ active: abaAtiva === 'inicio' }" href="#" @click.prevent="abaAtiva = 'inicio'">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{ active: abaAtiva === 'noticias' }" href="#" @click.prevent="abaAtiva = 'noticias'">Noticias</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{ active: abaAtiva === 'contato' }" href="#" @click.prevent="abaAtiva = 'contato'">Contato</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="flex-grow-1 py-5">
      <div class="container">

        <div v-if="abaAtiva === 'inicio'">
          <h2 class="mb-4">Bem-vindo ao Painel</h2>
          <div class="row g-4">
            <div class="col-12 col-md-4" v-for="card in cards" :key="card.titulo">
              <div class="card h-100 shadow-sm">
                <div class="card-body">
                  <h5 class="card-title">{{ card.titulo }}</h5>
                  <p class="card-text text-muted">{{ card.descricao }}</p>
                  <button class="btn btn-primary" @click="alertar(card.titulo)">Saiba Mais</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="abaAtiva === 'noticias'">
          <h2 class="mb-4">Ultimas Noticias</h2>
          <div class="row g-3">
            <div class="col-12 col-md-6" v-for="noticia in noticias" :key="noticia.titulo">
              <div class="card shadow-sm">
                <div class="card-body">
                  <span class="badge bg-secondary mb-2">{{ noticia.categoria }}</span>
                  <h5 class="card-title">{{ noticia.titulo }}</h5>
                  <p class="card-text text-muted">{{ noticia.resumo }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="abaAtiva === 'contato'">
          <h2 class="mb-4">Entre em Contato</h2>
          <div class="row justify-content-center">
            <div class="col-12 col-md-6">
              <form @submit.prevent="enviarFormulario" novalidate>
                <div class="mb-3">
                  <label class="form-label">Nome</label>
                  <input v-model="form.nome" type="text" class="form-control" :class="{ 'is-invalid': erros.nome }" />
                  <div class="invalid-feedback">{{ erros.nome }}</div>
                </div>
                <div class="mb-3">
                  <label class="form-label">E-mail</label>
                  <input v-model="form.email" type="email" class="form-control" :class="{ 'is-invalid': erros.email }" />
                  <div class="invalid-feedback">{{ erros.email }}</div>
                </div>
                <div class="mb-3">
                  <label class="form-label">Mensagem</label>
                  <textarea v-model="form.mensagem" class="form-control" rows="4" :class="{ 'is-invalid': erros.mensagem }" />
                  <div class="invalid-feedback">{{ erros.mensagem }}</div>
                </div>
                <button type="submit" class="btn btn-success w-100">Enviar</button>
                <div v-if="enviado" class="alert alert-success mt-3">
                  Mensagem enviada com sucesso!
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </main>

    <footer class="bg-dark text-white text-center py-3 mt-auto">
      <p class="mb-0">&copy; 2025 Painel de Noticias. Todos os direitos reservados.</p>
    </footer>

  </div>
</template>

<script>
export default {
  data() {
    return {
      abaAtiva: 'inicio',
      menuAberto: false,
      enviado: false,
      form: { nome: '', email: '', mensagem: '' },
      erros: { nome: '', email: '', mensagem: '' },
      cards: [
        { titulo: 'Tecnologia', descricao: 'Acompanhe as novidades do mundo tech.' },
        { titulo: 'Ciencia', descricao: 'Descobertas e avancos cientificos.' },
        { titulo: 'Cultura', descricao: 'Arte, musica e entretenimento.' },
      ],
      noticias: [
        { categoria: 'Tech', titulo: 'Vue.js 4 e anunciado', resumo: 'A nova versao traz melhorias de performance.' },
        { categoria: 'Ciencia', titulo: 'Nova descoberta espacial', resumo: 'Astronomos identificam exoplaneta habitavel.' },
        { categoria: 'Cultura', titulo: 'Festival de cinema 2025', resumo: 'Confira os filmes mais esperados do ano.' },
        { categoria: 'Tech', titulo: 'IA transforma o mercado', resumo: 'Empresas adotam inteligencia artificial em larga escala.' },
      ],
    }
  },
  methods: {
    alertar(titulo) {
      alert(`Voce clicou em: ${titulo}`)
    },
    enviarFormulario() {
      this.erros = { nome: '', email: '', mensagem: '' }
      let valido = true
      if (!this.form.nome.trim()) { this.erros.nome = 'Nome e obrigatorio.'; valido = false }
      if (!this.form.email.trim() || !this.form.email.includes('@')) { this.erros.email = 'Informe um e-mail valido.'; valido = false }
      if (!this.form.mensagem.trim()) { this.erros.mensagem = 'Mensagem e obrigatoria.'; valido = false }
      if (valido) {
        this.enviado = true
        this.form = { nome: '', email: '', mensagem: '' }
        setTimeout(() => { this.enviado = false }, 3000)
      }
    },
  },
}
</script>
