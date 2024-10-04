const mongoose = require('mongoose')
const argon2 = require('argon2')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true  
    },
    email: {
        type: String,
        required: true,
        unique: true  
    },
    
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function(next) {
    const user = this
    if(!user.isModified('password')) {
        next()
    }
    user.password = await argon2.hash(user.password);
    next();
})

const User = mongoose.model('user', userSchema)

module.exports = User