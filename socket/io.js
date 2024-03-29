const fs = require('fs')

let isso= (server)=>{
    let jwt = require('jwt-simple')
    let io = require('socket.io')(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      }
    })
    // io.origins(["https://berrytern.github.io:3001","https://berrytern.github.io:3000", "https://berrytern.github.io:3001"])
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