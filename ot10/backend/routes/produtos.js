const express = require('express')
const router = express.Router()
const Produto = require('../models/Produto')
const auth = require('../middlewares/auth')

router.get('/', auth, async (req, res) => {
  const produtos = await Produto.findAll()
  res.json(produtos)
})

router.post('/', auth, async (req, res) => {
  try {
    const produto = await Produto.create(req.body)
    res.json(produto)
  } catch {
    res.status(400).json({ erro: 'Dados invalidos.' })
  }
})

router.put('/:id', auth, async (req, res) => {
  await Produto.update(req.body, { where: { id: req.params.id } })
  res.json({ mensagem: 'Produto atualizado.' })
})

router.delete('/:id', auth, async (req, res) => {
  await Produto.destroy({ where: { id: req.params.id } })
  res.json({ mensagem: 'Produto deletado.' })
})

module.exports = router
