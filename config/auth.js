const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const Online = require('../models/Online')

function return_token(user){
    
    const now = Math.floor(Date.now() / 1000)
    
    const payload = {
        _id: user.id,
        name: user.username,
        email: user.email,
        eAdmin: user.eAdmin,
        iat: now,
        exp: now + (60 * 30 * 1)
    }
    
    return{...payload,token: jwt.encode(payload, process.env.AUTH_SECRET)
    }
    }
function auth(req,res,next){
    return (req,res,next)=>{
        header_token=req.header('Authorization') || null
        if(!header_token) {res.redirect('http://berrytern.github.io/api_DeskApp/html/login.html')}
        else{
        token = req.header('Authorization').split(' ')[1] || null
        if(!token){res.redirect('/login')}
        else{
            
            req.user=jwt.decode(token, process.env.AUTH_SECRET)
            Online.findOne({id:req.user._id},(err,doc)=>{
                if(!doc){res.status(401).send()}
                else{
                    next()
                }
            })
            }
        }
    }
}
module.exports = {return_token,auth}