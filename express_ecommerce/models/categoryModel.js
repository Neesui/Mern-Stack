const mongoose=require('mongoose')

const categorySchema=new mongoose.Schema({
    category_name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    }
},{timestamps:true})
//created at & updated at dinxa

module.exports=mongoose.model('Category',categorySchema)