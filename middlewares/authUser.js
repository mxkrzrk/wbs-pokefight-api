const jwt = require('jsonwebtoken')

const authUser = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) return res.status(400).send('No auth headers provided')

  const [bearer, token] = authHeader.split(' ')

  if (!token) return res.status(401).send('Access denied')

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).send('Access denied')
    req.user = payload
    next()
  })
}