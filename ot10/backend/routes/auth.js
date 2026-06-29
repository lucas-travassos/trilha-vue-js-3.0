const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')

const SEGREDO = 'segredo_ot10'

router.post('/registro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body
    const hash = await bcrypt.hash(senha, 10)
    const usuario = await Usuario.create({ nome, email, senha: hash })
    res.json({ mensagem: 'Usuario criado com sucesso!', id: usuario.id })
  } catch {
    res.status(400).json({ erro: 'Email ja cadastrado ou dados invalidos.' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body
    const usuario = await Usuario.findOne({ where: { email } })
    if (!usuario) return res.status(401).json({ erro: 'Credenciais invalidas.' })

    const valido = await bcrypt.compare(senha, usuario.senha)
    if (!valido) return res.status(401).json({ erro: 'Credenciais invalidas.' })

    const token = jwt.sign({ id: usuario.id }, SEGREDO, { expiresIn: '8h' })
    res.json({ token, nome: usuario.nome })
  } catch {
    res.status(500).json({ erro: 'Erro interno.' })
  }
})

module.exports = router
