const express = require('express')
const app = express()

//orma de ler json / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.get('/', (req,res) =>{
    return res.json({message: 'server is up'})
})

app.get('/user', (req,res) =>{
    return res.json(
        {nome:'rodrigo',idade:23}
    )
})
//ssh -i "pairkayaws.pem" ubuntu@ec2-15-228-185-140.sa-east-1.compute.amazonaws.com
app.get('/produtos', (req,res) =>{
    let produtos = {
        "1":{"Notbook":"Notbook","preco":"R$6000"},
        "2":{"Notbook":"Notbook","preco":"R$6000"},
        "3":{"Notbook":"Notbook","preco":"R$6000"},
        "4":{"Notbook":"Notbook","preco":"R$6000"},
        "5":{"Notbook":"Notbook","preco":"R$6000"},
        
    }

    return (
        res.json({"produtos": produtos})
    )
})

app.listen(3333)