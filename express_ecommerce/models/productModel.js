const mongoose=require('mongoose')

const {ObjectId}=mongoose.Schema
//objectId is used to link data between the different collection(table)
const productShema=new mongoose.Schema({
    product_name:{
        type:String,
        required:true,
        trim:true
    },
    product_price:{
        type:Number,
        required:true
    },
    countInStock:{
        type:Number,
        required:true
    },
    product_description:{
        type:String,
        required:true
    },
    product_image:{
        type:String,
        required:true
    },
    category:{
        type:ObjectId,
        required:true,
        ref:'Category'
    },
},{timestamps:true})

module.exports=mongoose.model('Product',productShema)