require('dotenv').config({path:'../config.env'})

//import java web token

const jwt = require('jsonwebtoken')

module.exports={
    auth:(req,res,next)=>{
        //header berisi token dikirim oleh user

        const authHeader = req.headers.authorization
        console.log("Header ",authHeader)

        const token = authHeader.split('')[1]
        console.log("Token nya Ini ")

        //jika token null atau tidak ada maka muncul pemberitahuan "Missing Token"
        if(token==null)return res.json("Missing Token")


        try {
            //jika token valid maka akan terverifikasi dengan SECRET_KEY
            const TokenisValid = jwt.verify(token,process.env.SECRET_KEY)
            console.log("Harap Token di isi",TokenisValid)


            //eksekusi lanjutan jika token valid
            if(TokenisValid){
                let(password, ...rest) = TokenisValid
                req.body=rest
                next()
            }
            

            //jika token tidak valid
        } catch (error) {
            res.json("Token is not valid")
            console.log("Token is not valid");
            
        }
    }
}