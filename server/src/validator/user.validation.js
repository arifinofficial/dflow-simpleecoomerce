const { check } = require('express-validator');

exports.registerValidation = [
    check('username', 'Username cannot be empty.').notEmpty()
];

exports.loginValidation = [
    check('username', 'Username cannot be empty.').notEmpty(),
    check('password', 'Password cannot be empty.').notEmpty(),
];