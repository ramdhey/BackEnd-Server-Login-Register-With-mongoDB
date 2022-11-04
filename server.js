require('dotenv').config({ path: './config.env' });
const PORT = process.env.PORT || 7600
const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");


const app = express()
const {db, MONGO_URI} = require('./config/index')

const indexrouter = require('./routes/index')
const registerRouter = require("./routes/regis/index");
const mottoRouter = require("./routes/motto/index");

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors());
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Cors Configuration - Start
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, PATCH, GET, DELETE"
    )
    return res.status(200).json({})
  }
  next()
})
//Cors Configuration - End


// Import index router
app.use("/", indexrouter);
// untuk mengambil data register member
app.use("/register", registerRouter);
// untuk mengambil data motto
app.use("/motto", mottoRouter);

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})


console.log("Mongodb uri live", MONGO_URI);

app.get('/test',(req,res)=>{
    res.json({
        message: 'ini '
    })
})


if (db) {
    console.log(`Koneksi berhasil`);
  } else {
    console.log("Koneksi database gagal");
  }


  
module.exports = app;

