const express = require("express");
const router = express.Router();
const {UrlModel} = require("../models/urlModel")


router.get("/", async(req,res)=>{

    const allUrls = await UrlModel.find({})
    console.log(allUrls)
    res.render('Home',{
        urls:allUrls
    })
})

module.exports = router