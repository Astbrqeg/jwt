const jwt = require("jsonwebtoken")
const db = require("../database/connection")

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(403).send({ success: false })
  }

  const token = authHeader.replace("Bearer ", "")

  const payload = jwt.verify(token, process.env.JWT_SECRET)

  db.query("SELECT * FROM users WHERE id = $1", [payload.id])
    .then((results) => {
      req.user = results.rows[0]
      next()
    })
    .catch(() => {
      res.status(403).send({ success: false })
    })
}