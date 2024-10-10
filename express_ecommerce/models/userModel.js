const mongoose=require('mongoose')
const uuidv1 = require('uuidv1')
const crypto =require('crypto')

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    hashed_password:{
        type:String,
        required:true,
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    isVerified:{
        type:Boolean,
        default:false
    }
    
},{timestamps:true})

userSchema.virtual('password')
.set(function(password){
    this._password=password
    this.salt=uuidv1()
    this.hashed_password=this.encryptPassword(password)
})
.get(function(){
    return this._password
})

userSchema.methods={
    encryptPassword:function(password){
        try{
            return crypto
            .Hmac('sha1',this.salt)
            .update(password)
            .digest('hex')
        }
        catch(err){
            return err
        }
    }
}

module.exports=mongoose.model('User',userSchema)