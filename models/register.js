const mongoose =require('mongoose')

const SchemaRegister = new mongoose.Schema({
    name:{
        type:String,
    },
    email : String,
    password : String,
    nama : String,
    address : String,
    skill : String,
    motto : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"motto",
    },
})

//create databasenya
const register = mongoose.model('register',SchemaRegister)

module.exports= register