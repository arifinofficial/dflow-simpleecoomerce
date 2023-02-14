const jwt = require('jsonwebtoken');
const defaultResponse = require('../utils/response');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
        return res.status(401).json(defaultResponse(false, 'Unauthorized'));

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err)
            return res.status(403).json(defaultResponse(false, 'Forbidden'));

        req.userId = decoded.id;
        next();
    });
}

module.exports = {
    authMiddleware
}