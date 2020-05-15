const router = require('express').Router()
const productController = require('../controller/productController')
const authetication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authetication)
router.use(authorization)
router.get('/', productController.getProduct)
router.get('/:id', productController.getProductById)
router.post('/', productController.postProduct)

router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router