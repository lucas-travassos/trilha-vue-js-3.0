<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-title>Painel Administrativo</v-app-bar-title>
      <v-spacer />
      <span class="mr-4">Ola, {{ auth.nome }}</span>
      <v-btn variant="text" @click="sair">Sair</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-tabs v-model="aba" class="mb-6">
          <v-tab value="produtos">Produtos</v-tab>
          <v-tab value="clima">Clima</v-tab>
        </v-tabs>

        <!-- ABA PRODUTOS -->
        <div v-if="aba === 'produtos'">
          <v-btn color="primary" class="mb-4" @click="abrirFormulario()">Novo Produto</v-btn>

          <v-text-field
            v-model="filtro"
            label="Filtrar por nome ou categoria"
            variant="outlined"
            class="mb-4"
          />

          <v-data-table
            :items="produtosFiltrados"
            :headers="cabecalhos"
            :items-per-page="5"
            class="elevation-1"
            no-data-text="Nenhum produto cadastrado."
          >
            <template #item.acoes="{ item }">
              <v-btn size="small" color="warning" class="mr-2" @click="abrirFormulario(item)">Editar</v-btn>
              <v-btn size="small" color="error" @click="deletar(item.id)">Deletar</v-btn>
            </template>
          </v-data-table>
        </div>

        <!-- ABA CLIMA -->
        <div v-if="aba === 'clima'">
          <h2 class="mb-4">Previsao do Tempo</h2>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="cidade"
                label="Digite a cidade"
                variant="outlined"
                @keyup.enter="buscarClima"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                v-model="unidade"
                :items="[{ title: 'Celsius (°C)', value: 'metric' }, { title: 'Fahrenheit (°F)', value: 'imperial' }]"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-btn color="primary" block height="56" @click="buscarClima">Buscar</v-btn>
            </v-col>
          </v-row>

          <v-alert v-if="loadingClima" type="info">Buscando clima...</v-alert>
          <v-alert v-if="erroClima" type="error">{{ erroClima }}</v-alert>

          <v-card v-if="clima" class="mt-4 pa-4">
            <v-card-title>{{ clima.cidade }}</v-card-title>
            <v-card-text>
              <p>Temperatura: {{ clima.temp }}{{ unidade === 'metric' ? '°C' : '°F' }}</p>
              <p>Sensacao termica: {{ clima.sensacao }}{{ unidade === 'metric' ? '°C' : '°F' }}</p>
              <p>Clima: {{ clima.descricao }}</p>
              <p>Umidade: {{ clima.umidade }}%</p>
            </v-card-text>
          </v-card>
        </div>
      </v-container>
    </v-main>

    <!-- MODAL DE PRODUTO -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>{{ produtoEditando ? 'Editar Produto' : 'Novo Produto' }}</v-card-title>
        <v-card-text>
          <v-form ref="formProduto" v-model="formProdutoValido">
            <v-text-field v-model="form.nome" label="Nome" :rules="[r => !!r || 'Obrigatorio']" variant="outlined" class="mb-3" />
            <v-text-field v-model="form.preco" label="Preco" type="number" :rules="[r => !!r || 'Obrigatorio']" variant="outlined" class="mb-3" />
            <v-text-field v-model="form.categoria" label="Categoria" :rules="[r => !!r || 'Obrigatorio']" variant="outlined" class="mb-3" />
            <v-text-field v-model="form.imagem" label="URL da Imagem" variant="outlined" class="mb-3" />
            <v-textarea v-model="form.descricao" label="Descricao" variant="outlined" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialog = false">Cancelar</v-btn>
          <v-btn color="primary" :disabled="!formProdutoValido" @click="salvarProduto">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import axios from 'axios'
import api from '@/services/api'
import { useAuthStore } from '@/stores/auth'

const API_KEY = '2eb8819bd44e7dbbed2808547f0725cd'

export default {
  data() {
    return {
      auth: useAuthStore(),
      aba: 'produtos',
      produtos: [],
      filtro: '',
      cabecalhos: [
        { title: 'Nome', key: 'nome' },
        { title: 'Preco (R$)', key: 'preco' },
        { title: 'Categoria', key: 'categoria' },
        { title: 'Acoes', key: 'acoes', sortable: false }
      ],
      dialog: false,
      formProdutoValido: false,
      produtoEditando: null,
      form: { nome: '', preco: '', categoria: '', imagem: '', descricao: '' },
      cidade: '',
      unidade: 'metric',
      clima: null,
      loadingClima: false,
      erroClima: ''
    }
  },
  computed: {
    produtosFiltrados() {
      if (!this.filtro) return this.produtos
      const f = this.filtro.toLowerCase()
      return this.produtos.filter(p =>
        p.nome.toLowerCase().includes(f) || p.categoria.toLowerCase().includes(f)
      )
    }
  },
  async created() {
    await this.carregarProdutos()
  },
  methods: {
    sair() {
      this.auth.logout()
      this.$router.push('/login')
    },
    async carregarProdutos() {
      const res = await api.get('/produtos')
      this.produtos = res.data
    },
    abrirFormulario(produto = null) {
      this.produtoEditando = produto
      this.form = produto
        ? { nome: produto.nome, preco: produto.preco, categoria: produto.categoria, imagem: produto.imagem, descricao: produto.descricao }
        : { nome: '', preco: '', categoria: '', imagem: '', descricao: '' }
      this.dialog = true
    },
    async salvarProduto() {
      try {
        if (this.produtoEditando) {
          await api.put(`/produtos/${this.produtoEditando.id}`, this.form)
        } else {
          await api.post('/produtos', this.form)
        }
        this.dialog = false
        await this.carregarProdutos()
      } catch {
        alert('Erro ao salvar produto.')
      }
    },
    async deletar(id) {
      if (!confirm('Deseja deletar este produto?')) return
      await api.delete(`/produtos/${id}`)
      await this.carregarProdutos()
    },
    async buscarClima() {
      this.clima = null
      this.erroClima = ''
      if (!this.cidade.trim()) { this.erroClima = 'Digite uma cidade.'; return }
      this.loadingClima = true
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.cidade}&appid=${API_KEY}&units=${this.unidade}&lang=pt_br`
        )
        this.clima = {
          cidade: res.data.name,
          temp: res.data.main.temp.toFixed(1),
          sensacao: res.data.main.feels_like.toFixed(1),
          descricao: res.data.weather[0].description,
          umidade: res.data.main.humidity
        }
      } catch (err) {
        this.erroClima = err.response?.status === 404
          ? 'Cidade nao encontrada.'
          : 'Erro ao buscar clima. Verifique sua conexao.'
      } finally {
        this.loadingClima = false
      }
    }
  }
}
</script>
