require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs')
const consign = require('consign')
const path =require('path')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
//const Conta = require('./models/Post')
const routes= require('./config/routes.js')
const mongoose = require('mongoose')
const {setoff} = require('./config/setoffline.js')
const {isso} = require('./socket/io.js')

var whitelist = ['https://berrytern.github.io', 'file:']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    console.log(req.header('Origin'))
    corsOptions = { origin: true } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
 
//Configurações
// cors
app.use(cors(corsOptionsDelegate))
// Body Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
// Handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
// path
    app.use(express.static(path.join(__dirname,"public")))
// Mongoose
mongoose.connect("mongodb://admin:admin@mongo:27017", { useNewUrlParser: true ,useUnifiedTopology: true}).then(()=>{
    console.log("Mongoose connected...")
}).catch((err)=>{
    console.log(`cant connect to Mongoose, Error: ${err}`)
})
// Session
// Middleware
app.use((req,res,next)=>{
    console.log('verificacao de acesso')
    if(true){
        next()
    }else{
        res.render('access_denied')
    }
})
        
    // Rotas
consign()
    .then('./config/routes.js')
    .into(app)

//socket.io
setInterval(setoff, 1000)

const server = require('https').createServer({
    key: fs.readFileSync('./.certs/server.key'),
    cert: fs.readFileSync('./.certs/server.crt')
    },
    app
)
const server_io = require('https').createServer({
    key: fs.readFileSync('./.certs/server.key'),
    cert: fs.readFileSync('./.certs/server.crt')
})
isso(server_io)
const Port = 8082
server_io.listen(3000)
server.listen(Port, ()=>{
    console.log(`Servidor rodando na url http://localhost:${Port}`)
})
//localhost:8082