<template>
  <div class="pagina">
    <h2>Home</h2>
    <ComponenteFilho :mensagem="mensagemParaFilho" @mensagem-filho="receberDoFilho" />
    <p v-if="respostaFilho" class="resposta">Resposta do filho: <strong>{{ respostaFilho }}</strong></p>
    <hr>
    <CardSlot>
      <template #cabecalho>Cadastro de Usuario</template>
      Conteudo principal via slot padrao.
      <template #rodape>Ultima atualizacao: 2025</template>
    </CardSlot>
    <hr>
    <div>
      <h3>Usando o Mixin</h3>
      <p>{{ mensagemMixin }}</p>
      <button @click="mostrarMensagemMixin">Mostrar via Mixin</button>
    </div>
    <hr>
    <ListaItens :itens="produtos" />
  </div>
</template>

<script>
import ComponenteFilho from '../components/ComponenteFilho.vue'
import CardSlot from '../components/CardSlot.vue'
import ListaItens from '../components/ListaItens.vue'
import meuMixin from '../mixins/meuMixin.js'

export default {
  components: { ComponenteFilho, CardSlot, ListaItens },
  mixins: [meuMixin],
  data() {
    return {
      mensagemParaFilho: 'Ola, filho! Mensagem do componente pai.',
      respostaFilho: '',
      produtos: [
        { id: 1, nome: 'Notebook' },
        { id: 2, nome: 'Mouse' },
        { id: 3, nome: 'Teclado' },
        { id: 4, nome: 'Monitor' }
      ]
    }
  },
  methods: {
    receberDoFilho(mensagem) {
      this.respostaFilho = mensagem
    }
  }
}
</script>

<style scoped>
.pagina { padding: 20px; }
hr { margin: 24px 0; }
.resposta { color: #27ae60; margin-top: 8px; }
button { padding: 6px 14px; cursor: pointer; background: #8e44ad; color: white; border: none; border-radius: 4px; }
</style>
