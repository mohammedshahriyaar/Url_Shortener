
// const { nanoid } = require('nanoid');

// const {UrlModel }= require("../models/urlModel")
// async function handleCreateNewShortUrl(req,res){

//     const shortId = nanoid(7);
//     const body = req.body
//     if(!body.url){
//         return res.status(400).json({msg:"Url is required"})
//     }

//     await UrlModel.create({
//         url:body.url,
//         shortId,
//         visitsHistory:[]
//     })
//     return res.json({id:shortId})
// }


// async function redirecttoUrl(req,res){
//     const shortId = req.params.id
//     const urlfromdb = await UrlModel.findOne({shortId})
//     if(!url){
//         return res.status(404).json({msg:"Url not found"})
//     }
//     url.visitsHistory.push({
//         timestamp:Date.now()
//     })
//     await url.save()
//      res.redirect(urlfromdb.url)
// }

// module.exports={handleCreateNewShortUrl,redirecttoUrl}

const { nanoid } = require('nanoid');
const { UrlModel } = require("../models/urlModel");

async function handleCreateNewShortUrl(req, res) {
    const shortId = nanoid(7);
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ msg: "Url is required" });
    }

    await UrlModel.create({
        url: body.url,
        shortId,
        visitsHistory: [],
        createdBy: req.user._id
    });

    return res.render('Home', { id: shortId });

    // return res.json({ id: shortId });
}

// async function redirecttoUrl(req, res) {
//     const shortId = req.params.id;
//     const urlfromdb = await UrlModel.findOne({ shortId });

//     if (!urlfromdb) {
//         return res.status(404).json({ msg: "Url not found" });
//     }

//     // Update visit history
//     urlfromdb.visitsHistory.push({
//         timestamp: Date.now()
//     });

//     await urlfromdb.save();
//     return res.redirect(urlfromdb.url);
// }


async function redirecttoUrl(req, res) {
    const shortId = req.params.id;
    // console.log(shortId)

    console.log(`Fetching URL for shortId: ${shortId}`); // Debugging log

    const urlfromdb = await UrlModel.findOne({ shortId });

    if (!urlfromdb) {
        console.log(`URL not found for shortId: ${shortId}`); // Debugging log
        return res.status(404).json({ msg: "Url not found" });
    }

    // Log the original URL found in DB
    console.log(`Redirecting to: ${urlfromdb.url}`);

    // Update visit history
    urlfromdb.visitsHistory.push({
        timestamp: Date.now()
    });

    await urlfromdb.save();

     res.redirect(urlfromdb.url);
}



async function  handleAnalytics(req,res) {
    const shortId = req.params.id;
    const urlfromdb = await UrlModel.findOne({ shortId });
    if (!urlfromdb) {
        return res.status(404).json({ msg: "Url not found" });
    }

    return res.json({
        totalClicks: urlfromdb.visitsHistory.length,
        history: urlfromdb.visitsHistory
    })
}
module.exports = { handleCreateNewShortUrl, redirecttoUrl,handleAnalytics };
