const router = require("express").Router()
const Person = require('../models/Person')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//rota da apii
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




//////////////////////////////////////////////////////
//Rotas do segundo projeto

//Autenticação e registro do usuário
router.post('/auth/register', async (req, res) => {
    const {name, email, password, confirmpassword } = req.body
    if(!name){
        return res.status(422).json({msg:'nome obrigatório!'})
    }
    if(!email){
        return res.status(422).json({msg:'e-mail obrigatório!'})
    }
    if(!password){
        return res.status(422).json({msg:'senha obrigatória!'})
    }
    if(!confirmpassword){
        return res.status(422).json({msg:'confirme a senha!'})
    }
    if(password !== confirmpassword){
        return res.status(422).json({msg:'senha não confere!'})
    }

    //checar se o usuário existe
    const userExists = await User.findOne({email: email})

    if(userExists){
        return res.status(422).json({msg:'porfavor utilize outro e-mail!'})
    }
    //criando senha com lib node
    const salt = await bcrypt.genSalt(12)
    const passwordHash =  await bcrypt.hash(password, salt)

    //criar usuário de fato

    const user = new User({
        name,
        email,
        password: passwordHash,
    })

    try{ 
        await user.save()
        res.status(200).json({msg:'usuário criado com sucesso!'})
    }
    catch(error){ res.status(500).json({msg: error})}

})

//Login do usuário
router.post('/auth/user', async (req, res) => {
    const {email, password} = req.body

    if(!email){ res.status(422).json({msg:'e-mail não foi digitado!'})}
    if(!password){ res.status(422).json({msg:'senha não foi digitada!'})}

    //verificando se existe o usuário
    const user = await User.findOne({email:email})

    if(!user){
        res.status(404).json({msg:'e-mail ou senha incorreto!'})
    }

    //checando a senha do digitada...
    const userPass = await bcrypt.compare(password, user.password)

    if(!userPass){
        res.status(422).json({msg:'e-mail ou senha incorreto!'})
        
    }

    try{
        const secret = process.env.SECRET

        const token = jwt.sign({id: user._id},secret)

        res.status(200).json({msg:'Autenticação  realizada com sucesso!', token})
    }
    catch(error){ res.status(500).json({msg: error})}
})

//Rota privada
router.get('/use/:id', async (req, res) => {
    const id = req.params.id
    
    const user = await User.findById(id, '-password')

        if(!user){
            return res.status(404).json({msg:'nao existeee'})
        }
  
    
})

module.exports = router