const { validationResult } = require('express-validator');
const defaultResponse = require('../utils/response');

const validation = runValidation = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(defaultResponse(false, errors.array()[0].msg));
    }

    next()
}

module.exports = validation;