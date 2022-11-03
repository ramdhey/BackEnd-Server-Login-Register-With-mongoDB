const mongoose = require('mongoose')

const {MONGO_URI} = require('./environment')


mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection
module.exports = db