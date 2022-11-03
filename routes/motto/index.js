var express = require('express')
var router =  express.Router()


const{getAllmotto,getmottobyId,postMotto,updateMottoById,deleteMottoById}= require('./controller')

router.get("/", getAllmotto);
router.get("/:id", getmottobyId);
router.post("/", postMotto);
router.put("/:id", updateMottoById);
router.delete("/:id", deleteMottoById);


module.exports=router