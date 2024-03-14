const express = require('express')
const { signUp } = require('../Controllers/userController')

const router = express.Router()

router.route('/signup').post(signUp)

module.exports = router