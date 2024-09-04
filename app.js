const path = require('path')
const express = require('express')
const app = express()
const authRoutes = require('./src/routes/authRoutes')
const connectDB = require('./src/config/database')
const userRoutes = require('./src/routes/userRoutes')

connectDB()



app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.static(path.join(__dirname, 'src/public')));
app.use(express.urlencoded({extended:true}))


app.use(authRoutes)
app.use(userRoutes)

app.listen(3000, () => console.log('server running perfectly'))