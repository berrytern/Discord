function admin(req,res,next){
    return (req,res,next)=>{
        
        user= req.user  || null
        if(!user){res.status(401).send('Usuário não é administrador.')}
        if(req.user.eAdmin) {
            next()
        } else {
            res.status(401).send('Usuário não é administrador.')
        }
    }
}

module.exports = {admin}