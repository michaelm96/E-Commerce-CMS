const authorization = (req,res,next) => {
    const { role } = req.userData

    if(role === "admin"){
        next()
    } else {
        next({name : 'Forbidden Access'})
    }
}

module.exports = authorization