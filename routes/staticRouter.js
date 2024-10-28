const express = require("express");
const router = express.Router();
const {UrlModel} = require("../models/urlModel")


router.get("/", async(req,res)=>{

    console.log(req.token)
    if(!req.token){
        return res.redirect('/login')
    }

    const allUrls = await UrlModel.find({createdBy:req.token._id})

    // const allUrls = await UrlModel.find({})
    // console.log(allUrls)
    res.render('Home',{
        urls:allUrls
    })
})


router.get('/signup', (req, res) => {
    res.render('signup')
})
router.get('/login', (req, res) => {
    res.render('login')
})

module.exports = router