const { check } = require('express-validator');
const { validateUserLogin } = require('./loginValidator');

validateUser = [
    check('username').trim().escape()
    .not().isEmpty().withMessage('Username can not be empty')
    .bail()
    .isLength({min: 3, max: 11}).withMessage('Username length should be minimum of 3 and maximum of 11')
    .bail(),
    check('email').trim().normalizeEmail()
    .not().isEmpty().withMessage('Email address can not be empty')
    .isEmail().withMessage('Provide a valid email address')
    .bail(),
    check('password').trim().escape()
    .not().isEmpty().withMessage('Password can not be empty')
    .bail()
    .isLength({min: 3, max: 20})
    .withMessage('Password length should be minimum of 3 and maximum of 20')
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/)
    .withMessage('Must have at least 1 uppercase, 1 lowercase letter and 1 number')
    .custom((value) => {
        if(value.length < 8){
            return Promise.reject('Password length must be greater than 8');
        }else{
            return true;
        }
    })
    .bail(),
]

// validateUserLogin = [
//     check('username').trim().escape()
//     .not().isEmpty().withMessage('Username can not be empty')
//     .bail()
//     .isLength({min: 3, max: 11}).withMessage('Username length should be minimum of 3 and maximum of 11')
//     .bail(),
//     check('password').trim().escape()
//     .not().isEmpty().withMessage('Password can not be empty')
//     .bail(),
// ];

module.exports = { 
    validateUser};