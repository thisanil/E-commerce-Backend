const jwt = require('jsonwebtoken')
const jwtAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Token Not Found'
    })
    try {
      const decode = jwt.verify(token, '1233434')
      req.user = decode
      next()
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Invalid Token'
      })
    }
  }
}
const generateToken = (loginData) => {
  return jwt.sign(loginData, '1233434')
}
module.exports = {
    jwtAuth,
    generateToken
}
