const createError =  require('../utils/error');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const { validationResult} = require('express-validator');

const register = async (req, res, next) => {
   const emailExist = User.findOne({email: req.body.email});
   if(emailExist) return res.status(400).json({message: 'Email already exists'});
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })

        await newUser.save();
        res.status(200).send('User has been created successfully!');
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const login = async (req, res, next) => {
    try {

        //VALIDATE USER DATA FOR LOGIN
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        
        const user = await User.findOne({username: req.body.username});
        if(!user) return next(createError(404, 'User not found'))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) 
            return next(createError(400, 'Wrong password or username'));
        
        //CREATE AND ASSIGN A TOKEN
        const token = jwt.sign({_id: user._id }, process.env.JWT_SECRET);
        res.header('auth-token', token).json({token: token});

        //res.status(200).json({message : 'Login Successful', user});



        //const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, 
            //'n/y1HzjLXD8Wzoen21E7G8fa0fFEbx2Rlfg6nO/CqXg=');
       
        //This will remove Password and isAdmin as part of the response
        //const { password, isAdmin, ...otherDetails} = user._doc;
        //res.cookie('access_token', token, { httpOnly: true,})
            //.status(200)
            //.json({...otherDetails});
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const dummyApi = async (req, res) => {
    console.log('Hey!!!')
    res.status(200).send('User has been created successfully!');
}

// function verifyToken(req, res, next) {
//     const bearerHeader = req.headers['authorization']
//     if(typeof bearerHeader !== 'undefined') {
//         const bearerToken = bearerHeader.split(' ')[1]
//         req.token = bearerToken
//         next()
//     }else{
//         res.sendStatus(403) // forbidden
//     }
// }

module.exports = {
    register,
    login,
    dummyApi
}

