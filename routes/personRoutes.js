const router = require("express").Router()
const Person = require('../models/Person')

//rota da api
router.post('/', async (req, res)=>{
    // req.body
    const {name, salary, approved} = req.body

    if(!name || !salary){
        res.status(422).json({message:'nome obrigatório'})
        return
    }
    const person = {
        name,
        salary,
        approved
    }
    try{
        await Person.create(person)
        res.status(201).json({message: 'pessoa criada com sucesso'})
    }
    catch (erro){
        res.status(500).json({erro: erro})
    }

})

router.get('/people', async (req, res) => {
    try{
        const people = await Person.find()
        res.status(200).json(people)
    }
    catch(erro){
        res.status(500).json({erro: erro})   
    }
})

router.get('/user/:id', async (req, res) => {
    //extrair o dado da requisição por params = req.params
    const id = req.params.id

    try{
        const person = await Person.findOne({_id: id})
        if(person === null) return res.status(422).json({message: 'usuario nao existe'})
        res.status(200).json(person)     
    }
    catch(erro){
        res.status(422).json({message: 'usuario não encontrado na base de dados'})   
    }
})

// Update- atualização de dados (PUT, PATCH)
// PUT atualiza completamente o usuario enquanto 
// PATCH atualiza parcialmente algum dado do usuario
router.patch('/update/:id', async (req, res) => {
    //pegando parametro id da requisisão
    const id = req.params.id
    const { name, salary, approved} = req.body
    const person = {
        name,
        salary,
        approved,
    }
    try {
        await Person.updateOne({_id:id}, person)
        res.status(200).json({sucess: 'sucesso'})
    }
    catch(erro){
        res.status(422).json({erro: erro})
    }
})

router.delete('/delete/:id', async (req, res) => {

    try{
        const id = req.params.id
        await Person.deleteOne({_id:id})
        res.status(200).json({message:'usuario deletado'})
    }
    catch(erro){
        res.status(422).json({erro:erro})
    }
})

module.exports = router