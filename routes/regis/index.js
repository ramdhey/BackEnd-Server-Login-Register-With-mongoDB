var express = require('express')
var router = express.Router()

const {getAllRegis,getRegisterById,postRegister,updateRegisterById,deleteRegisterById,getRegisterInClass,loginRegister,} = require('./controller')

const {auth} = require('../../authentication/auth')

// Auth adalah penengahnya, jika tidak lolos di auth maka "Hallo user member tidak muncul"

router.get("/notFound",auth,(req,res)=>{
    res.json({
        message:"Hallo member regis",
        user: req.body,
    })
})

router.get("/", getAllRegis);
router.get("/:id", getRegisterById);
router.get("/class/:id", getRegisterInClass);
router.post("/", postRegister);
router.put("/:id", updateRegisterById);
router.delete("/:id", deleteRegisterById);
router.post("/login", loginRegister);


module.exports = router
