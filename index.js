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
    const produtos = {
        'produto':'Notbook','preco':'R$6000',
        'produto':'Celular','preco':'R$2000',
        'produto':'Computador','preco':'R$8000',
        'produto':'TV smart','preco':'R$5500',
        'produto':'Whatch','preco':'R$800',
        'produto':'Fone sem fio','preco':'R$2000',
        'produto':'Tablet','preco':'R$3000',
    }

    return (
        res.json({produtos: produtos})
    )
})

app.listen(3333)