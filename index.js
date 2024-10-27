const express = require("express");
const app = express();
const port = 3000;
const { connectMongodb } = require("./dbConnect");
const urlRoute = require("./routes/url");
const { UrlModel } = require("./models/urlModel");
const path = require('path')
const staticRoute = require('./routes/staticRouter')

// Connect to MongoDB
connectMongodb('mongodb+srv://mohammedshahriyaar:mongoshah@cluster0.btnpi.mongodb.net/')
    .then(() => console.log("Mongo connected"))
    .catch((err) => console.log("Mongo connect failed", err));

// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: false }));//also supports form data
app.use(express.json());

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'))

// Route for URL shortening
app.use('/url', urlRoute);  // Keep this only, as /url is sufficient
app.use('/',staticRoute)


// app.get('/test', async (req, res) => {
//     const allUrls = await UrlModel.find({})
//     // console.log(allUrls)
//     res.send(`<ul>

//             ${allUrls.map(url => `<li>${url.url}</li> - ${url.shortId}-${url.visitsHistory.length}`).join('')}
//         </ul>`)
// })


app.get('/test',async( req,res)=>{
    const allUrls = await UrlModel.find({})
    return res.render('Home',{
        allUrls})
})





// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
