const express = require('express')

const app = express()

app.get('/', (req,res) =>{
    return res.json({message: 'server is up'})
})

app.get('/user', (req,res) =>{
    return res.json(
        {nome:'rodrigo',idade:23}
    )
})

app.get('/produtos', (req,res) =>{
    let produtos = {
        "1":{"Notbook":"Notbook","preco":"R$6000"},
        "2":"Notbook2","preco":"R$6000",
        "3":"Notbook3","preco":"R$6000",
        "4":"Notbook4","preco":"R$6000",
        "5":"Notbook5","preco":"R$6000",
        "6":"Notbook6","preco":"R$6000",
        "7":"Notbook7","preco":"R$6000",
        
    }

    return (
        res.json({"produtos": produtos})
    )
})

app.listen(3333)