const mongoose = require('mongoose')

const SchemaMotto = new mongoose.Schema({
    motto:{
        type:String,
        require:true,
    },
    biography:String,
    age:Number,
})

//create database 
const motto = mongoose.model('motto',SchemaMotto)

module.exports = motto