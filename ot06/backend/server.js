const express = require('express')
const cors = require('cors')
const sequelize = require('./config/database')
const usuariosRoutes = require('./routes/usuarios')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/usuarios', usuariosRoutes)

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('API rodando em http://localhost:3000'))
})
