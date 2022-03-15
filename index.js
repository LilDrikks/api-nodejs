const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()

const Person = require('./models/Person')

//forma de ler json / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

//importando rotas do router express
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

app.use((req, res ,next) => {
    res.header('Acces-Control-Allow-Origin', '*')
    res.header(
        'Acces-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )

    if(req.method === 'OPTIONS'){
        res.header('Acces-Control-Allow-Method',
         'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).send({})
    }
    next()
})

//rota inicial / endpoint
app.get('/', (req,res) =>{
    return res.json({message: 'server is up'})
})

//entregar uma porta 
mongoose
    .connect('mongodb+srv://lildrikks:OzM6cEeoiY3vXxKD@apicuster.swkvs.mongodb.net/bancodaapi?retryWrites=true&w=majority')
    .then(() => {
        app.listen(3333)
        console.log('conectado ao mongo')
    })
    .catch((err) => console.log(err))

    //ssh -i "pairkayaws.pem" ubuntu@ec2-15-228-185-140.sa-east-1.compute.amazonaws.com