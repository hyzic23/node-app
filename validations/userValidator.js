const { check } = require('express-validator');

validateUser = [
    check('username').trim().escape()
    .not().isEmpty().withMessage('Username can not be empty')
    .bail()
    .isLength({min: 3, max: 11}).withMessage('Username length should be minimum of 3 and maximum of 11')
    .bail(),
    check('email').trim().normalizeEmail()
    .not().isEmpty().withMessage('Invalid email address')
    .bail(),
    check('password').trim().escape()
    .not().isEmpty().withMessage('Password can not be empty')
    .bail()
    .isLength({min: 3, max: 20}).withMessage('Password length should be minimum of 3 and maximum of 20')
    .bail(),
];

module.exports = { validateUser };