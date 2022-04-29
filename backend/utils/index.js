const jwt = require('jsonwebtoken');

exports.getUserId = (key) => { // Get own profil
    const token = key.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    return userId
};