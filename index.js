const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
require('dotenv').config()


const cors = require('cors')
app.use(cors())

//forma de ler json / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())
//importando rotas do router express
const personRoutes = require('./routes/personRoutes')
app.use('/', personRoutes)

//rota inicial / endpoint
app.get('/', (req,res) =>{
    return res.json({message: 'server is up'})
})

//credenciais

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

//entregar uma porta 
const port = process.env.PORT || 3333
mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPass}@apicuster.swkvs.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(port)
        console.log('conectado ao mongo')
    })
    .catch((err) => console.log(err))

    //ssh -i "pairkayaws.pem" ubuntu@ec2-15-228-185-140.sa-east-1.compute.amazonaws.com