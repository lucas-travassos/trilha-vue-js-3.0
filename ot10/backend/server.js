const express = require('express')
const cors = require('cors')
const sequelize = require('./config/database')
const authRoutes = require('./routes/auth')
const produtoRoutes = require('./routes/produtos')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/produtos', produtoRoutes)

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('API rodando em http://localhost:3000'))
})
