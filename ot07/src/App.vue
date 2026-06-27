<template>
  <div style="max-width: 700px; margin: 40px auto; padding: 0 20px; font-family: sans-serif;">
    <h1>Consulta Brasil</h1>

    <!-- Busca de CEP -->
    <section style="margin-bottom: 40px;">
      <h2>Busca de CEP</h2>
      <div style="display: flex; gap: 10px; margin-bottom: 10px;">
        <input
          v-model="cep"
          type="text"
          placeholder="Digite o CEP (somente numeros)"
          maxlength="8"
          style="flex: 1; padding: 8px; font-size: 16px;"
          @keyup.enter="buscarCep"
        />
        <button @click="buscarCep" style="padding: 8px 16px; cursor: pointer;">Buscar</button>
      </div>

      <p v-if="loadingCep" style="color: gray;">Buscando endereco...</p>
      <p v-if="erroCep" style="color: red;">{{ erroCep }}</p>

      <div v-if="endereco" style="background: #f0f0f0; padding: 16px; border-radius: 8px;">
        <p><strong>Rua:</strong> {{ endereco.logradouro || 'Nao informado' }}</p>
        <p><strong>Bairro:</strong> {{ endereco.bairro || 'Nao informado' }}</p>
        <p><strong>Cidade:</strong> {{ endereco.localidade }} - {{ endereco.uf }}</p>
        <p><strong>CEP:</strong> {{ endereco.cep }}</p>
      </div>
    </section>

    <!-- Previsao do Tempo -->
    <section>
      <h2>Previsao do Tempo</h2>
      <div style="display: flex; gap: 10px; margin-bottom: 10px; flex-wrap: wrap;">
        <input
          v-model="cidade"
          type="text"
          placeholder="Digite o nome da cidade"
          style="flex: 1; padding: 8px; font-size: 16px;"
          @keyup.enter="buscarClima"
        />
        <select v-model="unidade" style="padding: 8px; font-size: 16px;">
          <option value="metric">Celsius (°C)</option>
          <option value="imperial">Fahrenheit (°F)</option>
        </select>
        <button @click="buscarClima" style="padding: 8px 16px; cursor: pointer;">Buscar</button>
      </div>

      <p v-if="loadingClima" style="color: gray;">Buscando clima...</p>
      <p v-if="erroClima" style="color: red;">{{ erroClima }}</p>

      <div v-if="clima" style="background: #f0f0f0; padding: 16px; border-radius: 8px;">
        <p><strong>Cidade:</strong> {{ clima.cidade }}</p>
        <p><strong>Temperatura:</strong> {{ clima.temp }}{{ unidade === 'metric' ? '°C' : '°F' }}</p>
        <p><strong>Sensacao termica:</strong> {{ clima.sensacao }}{{ unidade === 'metric' ? '°C' : '°F' }}</p>
        <p><strong>Clima:</strong> {{ clima.descricao }}</p>
        <p><strong>Umidade:</strong> {{ clima.umidade }}%</p>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

const API_KEY = '2eb8819bd44e7dbbed2808547f0725cd'

export default {
  data() {
    return {
      cep: '',
      endereco: null,
      loadingCep: false,
      erroCep: '',

      cidade: '',
      unidade: 'metric',
      clima: null,
      loadingClima: false,
      erroClima: '',
    }
  },
  methods: {
    async buscarCep() {
      this.endereco = null
      this.erroCep = ''

      const cepLimpo = this.cep.replace(/\D/g, '')
      if (cepLimpo.length !== 8) {
        this.erroCep = 'CEP invalido. Digite exatamente 8 numeros.'
        return
      }

      this.loadingCep = true
      try {
        const res = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        if (res.data.erro) {
          this.erroCep = 'CEP nao encontrado.'
        } else {
          this.endereco = res.data
        }
      } catch (error) {
        if (error.request) {
          this.erroCep = 'Erro de conexao. Verifique sua internet.'
        } else {
          this.erroCep = 'Erro desconhecido ao buscar CEP.'
        }
      } finally {
        this.loadingCep = false
      }
    },

    async buscarClima() {
      this.clima = null
      this.erroClima = ''

      if (!this.cidade.trim()) {
        this.erroClima = 'Digite o nome de uma cidade.'
        return
      }

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
          umidade: res.data.main.humidity,
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.erroClima = 'Cidade nao encontrada. Verifique o nome digitado.'
        } else if (error.request) {
          this.erroClima = 'Erro de conexao. Verifique sua internet.'
        } else {
          this.erroClima = 'Erro desconhecido ao buscar clima.'
        }
      } finally {
        this.loadingClima = false
      }
    },
  },
}
</script>
