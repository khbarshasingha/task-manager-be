const jwt = require('jsonwebtoken');

const JWT_SECRET = 'syc';

module.exports = function (req, res, next) {
    // get token from header
    const authHeader = req.header('Authorization');

    // check if token is missing
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // extract the token
    const token = authHeader.split(' ')[1];
    console.log('Token:', token); // log the token to see if it’s correct

    try {
        // verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('Invalid token:', err.message); // Log errors
        res.status(401).json({ message: 'Token is not valid' });
    }
};
