export default {
  data() {
    return {
      mensagemMixin: 'Dados vindos do mixin!'
    }
  },
  methods: {
    mostrarMensagemMixin() {
      alert('[mixin] ' + this.mensagemMixin)
    }
  }
}
