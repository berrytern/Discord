
let isso= (port)=>{
    let jwt = require('jwt-simple')

    let io = require('socket.io')(port)
    let Conta = require('../models/Conta')
    let users = []
    io.on('connection',(client)=>{
        function next(){
            client.on('startshare',data=>{client.emit('isso',data);console.log('data',data)})
        }
        let token = client.handshake.query.token;
        try{
           user = jwt.decode(token,process.env.AUTH_SECRET)
           next()
        }catch(err){next()}//client.emit('tologin')}
        
    })
}
module.exports = {isso}