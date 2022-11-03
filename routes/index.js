var express = require('express')
var router =  express.Router()

router.get("/",function(req,res,next){
    res.send("Selamat datang di server register dan login yang dilindungi oleh JWT dan bcrypt")
})

module.exports= router