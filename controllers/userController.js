const {UserModel} = require('../models/userModel')
const { v4: uuidv4 } = require('uuid');
const{setUser} = require('../services/Auth')
async function handleUserSignup(req, res) {

    const {name,email,password} = req.body
    // console.log(`${name} ${email} ${password}`)
    if(!name || !email || !password){
        return res.status(404).json({msg:"All fields are required"})
    }

    // console.log(req.body)
    const user = await UserModel.create({name,email,password})
    // console.log(user)
    // return res.status(201).json({msg:"success" ,id:user._id,user}) 

    // return res.render('Home')
    return res.redirect('/')
}


async function handleUserLogin(req, res) {
    const {email,password} = req.body
    // console.log(req.body)
    if(!email || !password){
        return res.status(404).json({msg:"All fields are required"})
    }
    const user = await UserModel.findOne({email,password})
    // console.log(user)
    if(!user){
        return res.render('login',{
            error:"Invalid email or password"
        })
    }


    const token = setUser(user)
    // console.log(token)
    res.cookie('jwt',token)


    return res.redirect('/')

}


module.exports={handleUserSignup,handleUserLogin}