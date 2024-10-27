const mongoose = require("mongoose")



const urlSchema  = new mongoose.Schema({

    url:{
        type:String,
        required:true
    },
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    visitsHistory:[
        {
            timestamp:{
                type:Number
            }
        }

    ],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},
{
    timestamps:true
})


const UrlModel = mongoose.model("Url",urlSchema) 
module.exports = {UrlModel}