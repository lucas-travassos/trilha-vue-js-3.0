const jwt = require('jsonwebtoken')
const SEGREDO = 'segredo_ot10'

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) return res.status(401).json({ erro: 'Token nao fornecido.' })

  try {
    const decoded = jwt.verify(token, SEGREDO)
    req.usuarioId = decoded.id
    next()
  } catch {
    res.status(401).json({ erro: 'Token invalido.' })
  }
}
