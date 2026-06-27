<template>
  <div class="container mt-5">
    <h2>Gerenciamento de Usuarios</h2>

    <form @submit.prevent="salvar" class="mb-4">
      <div class="mb-3">
        <label>Nome</label>
        <input v-model="form.nome" type="text" class="form-control" placeholder="Nome do usuario" />
        <span v-if="erros.nome" class="text-danger">{{ erros.nome }}</span>
      </div>
      <div class="mb-3">
        <label>Email</label>
        <input v-model="form.email" type="email" class="form-control" placeholder="Email do usuario" />
        <span v-if="erros.email" class="text-danger">{{ erros.email }}</span>
      </div>
      <button type="submit" class="btn btn-primary">Cadastrar</button>
    </form>

    <div v-if="mensagem" class="alert alert-success">{{ mensagem }}</div>
    <div v-if="erro" class="alert alert-danger">{{ erro }}</div>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Acao</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td>{{ usuario.id }}</td>
          <td>{{ usuario.nome }}</td>
          <td>{{ usuario.email }}</td>
          <td>
            <button class="btn btn-danger btn-sm" @click="deletar(usuario.id)">Deletar</button>
          </td>
        </tr>
        <tr v-if="usuarios.length === 0">
          <td colspan="4" class="text-center">Nenhum usuario cadastrado.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:3000' })

export default {
  data() {
    return {
      usuarios: [],
      form: { nome: '', email: '' },
      erros: { nome: '', email: '' },
      mensagem: '',
      erro: '',
    }
  },
  async created() {
    await this.carregar()
  },
  methods: {
    async carregar() {
      const res = await api.get('/usuarios')
      this.usuarios = res.data
    },
    async salvar() {
      this.erros = { nome: '', email: '' }
      this.mensagem = ''
      this.erro = ''

      if (!this.form.nome.trim()) { this.erros.nome = 'Nome obrigatorio.'; return }
      if (!this.form.email.trim() || !this.form.email.includes('@')) { this.erros.email = 'Email invalido.'; return }

      try {
        await api.post('/usuarios', this.form)
        this.form = { nome: '', email: '' }
        this.mensagem = 'Usuario cadastrado com sucesso!'
        await this.carregar()
        setTimeout(() => { this.mensagem = '' }, 3000)
      } catch (err) {
        this.erro = 'Erro ao cadastrar. Email ja existe?'
      }
    },
    async deletar(id) {
      if (!confirm('Deseja deletar este usuario?')) return
      await api.delete(`/usuarios/${id}`)
      await this.carregar()
    },
  },
}
</script>
