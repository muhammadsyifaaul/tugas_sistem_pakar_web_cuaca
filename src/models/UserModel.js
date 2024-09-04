const mongoose = require('mongoose')
const argon2 = require('argon2')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next()
    }
    this.password = await argon2.hash(this.password);
    next();
})

const User = mongoose.model('user', userSchema)

module.exports = User