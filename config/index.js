//import database from db
const db = require("./db")


//import enviroment
const { MONGO_URI } = require('./environment')


module.exports={
    db,MONGO_URI
}