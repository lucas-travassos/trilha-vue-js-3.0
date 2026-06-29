<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-6" elevation="8">
          <v-card-title class="text-h5 text-center mb-4">
            {{ modo === 'login' ? 'Login' : 'Registro' }}
          </v-card-title>

          <v-form ref="form" v-model="formValido">
            <v-text-field
              v-if="modo === 'registro'"
              v-model="nome"
              label="Nome"
              :rules="[r => !!r || 'Nome obrigatorio']"
              variant="outlined"
              class="mb-3"
            />
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              :rules="[r => !!r || 'Email obrigatorio']"
              variant="outlined"
              class="mb-3"
            />
            <v-text-field
              v-model="senha"
              label="Senha"
              type="password"
              :rules="[r => !!r || 'Senha obrigatoria']"
              variant="outlined"
              class="mb-3"
            />
          </v-form>

          <v-alert v-if="erro" type="error" class="mb-3">{{ erro }}</v-alert>
          <v-alert v-if="sucesso" type="success" class="mb-3">{{ sucesso }}</v-alert>

          <v-btn
            color="primary"
            block
            :disabled="!formValido"
            :loading="loading"
            @click="submeter"
          >
            {{ modo === 'login' ? 'Entrar' : 'Registrar' }}
          </v-btn>

          <v-btn variant="text" block class="mt-3" @click="alternarModo">
            {{ modo === 'login' ? 'Nao tem conta? Registre-se' : 'Ja tem conta? Faca login' }}
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from '@/services/api'
import { useAuthStore } from '@/stores/auth'

export default {
  data() {
    return {
      modo: 'login',
      nome: '',
      email: '',
      senha: '',
      formValido: false,
      loading: false,
      erro: '',
      sucesso: ''
    }
  },
  methods: {
    alternarModo() {
      this.modo = this.modo === 'login' ? 'registro' : 'login'
      this.erro = ''
      this.sucesso = ''
    },
    async submeter() {
      this.erro = ''
      this.sucesso = ''
      this.loading = true
      try {
        if (this.modo === 'registro') {
          await api.post('/auth/registro', { nome: this.nome, email: this.email, senha: this.senha })
          this.sucesso = 'Conta criada! Faca login.'
          this.modo = 'login'
        } else {
          const res = await api.post('/auth/login', { email: this.email, senha: this.senha })
          useAuthStore().login(res.data.token, res.data.nome)
          this.$router.push('/painel')
        }
      } catch (err) {
        this.erro = err.response?.data?.erro || 'Erro ao processar requisicao.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
