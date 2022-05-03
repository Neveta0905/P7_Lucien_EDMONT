const jwt = require('jsonwebtoken');

exports.getUserId = (key) => { // Get own profil
    const token = key.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TokenCrypter);
    const userId = decodedToken.userId;
    return userId
};