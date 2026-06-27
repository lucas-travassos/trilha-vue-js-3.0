const express = require('express')
const router = express.Router()
const Usuario = require('../models/Usuario')

router.get('/', async (req, res) => {
  const usuarios = await Usuario.findAll()
  res.json(usuarios)
})

router.post('/', async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body)
    res.json(usuario)
  } catch (err) {
    res.status(400).json({ erro: 'Email ja cadastrado ou dados invalidos.' })
  }
})

router.delete('/:id', async (req, res) => {
  await Usuario.destroy({ where: { id: req.params.id } })
  res.json({ mensagem: 'Usuario deletado.' })
})

module.exports = router
