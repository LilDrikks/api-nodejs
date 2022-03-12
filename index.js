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
        "produto":"Notbook","preco":"R$6000",
        "produto":"Notbook2","preco":"R$6000",
        "produto":"Notbook3","preco":"R$6000",
        "produto":"Notbook4","preco":"R$6000",
        "produto":"Notbook5","preco":"R$6000",
        "produto":"Notbook6","preco":"R$6000",
        "produto":"Notbook7","preco":"R$6000",
        
    }

    return (
        res.json({"produtos": produtos})
    )
})

app.listen(3333)