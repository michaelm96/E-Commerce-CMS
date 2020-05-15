require('dotenv').config()
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

const authentication = (req,res,next) => {
    const { access_token } = req.headers
    
    if(!access_token){
        next({status: 404, name: 'Token not found'})
    }try{
        const decoded = jwt.verify(access_token, secretKey);
        req.userData = decoded
        next()
    }catch(err){
        res.status(500).json(err)
    }

}

module.exports = authentication