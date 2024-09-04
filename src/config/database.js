const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const connectDB = () => {
    mongoose.connect(process.env.DB_URL)
.then(res => console.log('database connect successfully'))
.catch(err => console.log(err))
}

module.exports = connectDB