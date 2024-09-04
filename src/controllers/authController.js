const User = require('../models/UserModel')
const validator = require('validator')
const argon2 = require('argon2')
exports.register = async (req,res) => {
    const {username,email,password} = req.body
    const user = new User({
        username,
        email,
        password
    })
    await user.save()
    res.redirect('/login')
}

exports.login = async (req,res) => {
    let {email,password} = req.body
    email = validator.trim(email);
    email = validator.escape(email);
    password = validator.trim(password);
    password = validator.escape(password);
    const user = await User.findOne({email});

    if(!validator.isEmail(email)) {
        return res.render('auth/login', {
            message: 'Please enter a valid email'
        })
    }

    if(!user) {
        return res.render('auth/login', {
            message: 'User not found'
        })
    }
    if(user) {
        const match = await argon2.verify(user.password, password)
        if(!match) {
            return res.render('auth/login', {
                message: 'Incorrect password'
            })
        }
        // req.session.userId = user._id
        return res.redirect('/homePage')
    }
}