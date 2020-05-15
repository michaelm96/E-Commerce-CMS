const { Product } = require('../models')

class ProductController{
    static getProduct(req,res,next){

        Product.findAll({
            order: [['id', 'ASC']]
        })
        .then(product =>{
            res.status(200).json(product)
        })
        .catch(err =>{
            next(err)
        })
    }

    static getProductById(req,res,next){
        const { id } = req.params

        Product.findByPk(id)
        .then(product =>{
            if(!product){
                next({ name: 'Product not found' })
            }else{
                res.status(200).json(product)
            }
        })
        .catch(err =>{
            next(err)
        })
    }

    static postProduct(req,res,next){

        const { name,image_url,price,stock } = req.body
        Product.create({
            name,
            image_url,
            price,
            stock
        })
        .then(product =>{
            res.status(201).json(product)
        })
        .catch(err =>{
            next(err)
        })
    }

    static updateProduct(req,res,next){
        const { name,image_url,price,stock } = req.body
        const { id } = req.params
        console.log(req.body);
        console.log(req.params);

        Product.update({
            name,
            image_url,
            price,
            stock
        },{where : {id}})
        .then(product =>{
            if(product == 0){
                next({ name: 'Product not found' })
            }else{
                res.status(200).json(product)
            }
        })
        .catch(err =>{
            next(err)
        })
    }

    static deleteProduct(req,res,next){
        const { id } = req.params

        Product.destroy({
            where: {id}
        })
        .then(product =>{
            if(product == 0){
                next({ name: 'Product not found' })
            }else{
                res.status(200).json({name: "Product successfully deleted"})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ProductController