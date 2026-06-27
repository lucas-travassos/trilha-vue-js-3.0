const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('ot06', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

sequelize.authenticate()
  .then(() => console.log('Conexao com MySQL estabelecida!'))
  .catch(err => console.error('Erro ao conectar:', err))

module.exports = sequelize
