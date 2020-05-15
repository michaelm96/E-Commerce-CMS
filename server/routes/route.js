const router = require('express').Router()
const userController = require('../controller/userController')
const productRoutes = require('./productRoutes')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.use('/product', productRoutes)

module.exports = router