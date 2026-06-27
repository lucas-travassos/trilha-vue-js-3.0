<template>
  <v-app>
    <v-main>
      <v-container>

        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card>
              <v-card-title class="text-h6">Cadastro de Produtos</v-card-title>
              <v-card-text>
                <v-form ref="form" v-model="formValido">
                  <v-text-field
                    v-model="produto.nome"
                    label="Nome do Produto"
                    :rules="[regras.obrigatorio]"
                    variant="outlined"
                    class="mb-3"
                  />
                  <v-text-field
                    v-model="produto.preco"
                    label="Preco (R$)"
                    :rules="[regras.obrigatorio, regras.numero]"
                    variant="outlined"
                    type="number"
                    class="mb-3"
                  />
                  <v-text-field
                    v-model="produto.estoque"
                    label="Estoque"
                    :rules="[regras.obrigatorio, regras.numero]"
                    variant="outlined"
                    type="number"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions class="px-4 pb-4">
                <v-spacer />
                <v-btn
                  color="primary"
                  :disabled="!formValido"
                  @click="abrirConfirmacao"
                >
                  Salvar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row justify="center" class="mt-6">
          <v-col cols="12" md="8">
            <v-data-table
              :items="produtos"
              :headers="cabecalhos"
              class="elevation-1"
              no-data-text="Nenhum produto cadastrado."
            />
          </v-col>
        </v-row>

      </v-container>
    </v-main>

    <v-dialog v-model="dialogAberto" max-width="400">
      <v-card>
        <v-card-title>Confirmar Cadastro</v-card-title>
        <v-card-text>
          Deseja salvar o produto <strong>{{ produto.nome }}</strong>?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="secondary" @click="dialogAberto = false">Cancelar</v-btn>
          <v-btn color="primary" @click="salvarProduto">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script>
export default {
  data() {
    return {
      formValido: false,
      dialogAberto: false,
      produto: {
        nome: '',
        preco: '',
        estoque: '',
      },
      produtos: [],
      cabecalhos: [
        { title: 'Nome', key: 'nome' },
        { title: 'Preco (R$)', key: 'preco' },
        { title: 'Estoque', key: 'estoque' },
      ],
      regras: {
        obrigatorio: value => !!value || 'Campo obrigatorio.',
        numero: value => !isNaN(value) || 'Deve ser um numero.',
      },
    }
  },
  methods: {
    abrirConfirmacao() {
      this.dialogAberto = true
    },
    salvarProduto() {
      this.produtos.push({ ...this.produto })
      this.produto = { nome: '', preco: '', estoque: '' }
      this.$refs.form.reset()
      this.dialogAberto = false
    },
  },
}
</script>
