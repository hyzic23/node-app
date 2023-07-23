const { check } = require('express-validator');

validateUserLogin = [
    check('username').trim().escape()
    .not().isEmpty().withMessage('Username can not be empty')
    .bail()
    .isLength({min: 3, max: 11}).withMessage('Username length should be minimum of 3 and maximum of 11')
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
];

module.exports = { validateUserLogin };