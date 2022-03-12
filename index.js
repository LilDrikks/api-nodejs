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