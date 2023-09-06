const router = require("express").Router()
const signup = require("./controllers/signup.controller")
const login = require("./controllers/login.controller")
const verify = require("./middleware/verify")
const logout = require("./controllers/logout")


router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)

module.exports = router;