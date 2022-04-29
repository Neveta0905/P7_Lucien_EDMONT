const jwt = require('jsonwebtoken');

exports.all = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TokenCrypter);
    const userId = decodedToken.userId.toString();
    req.auth = { userId }
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(403).json({
      error: 'Unauthorized request'
    });
  }
};

exports.admin = (req, res, next) => { // Faut envoyer authorization : token + role:2 + id correspondant au token

  const token1 = req.headers.authorization.split(' ')[1];
  const decodedToken1 = jwt.verify(token1, process.env.TokenCrypter); 
  console.log(decodedToken1)
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TokenCrypter);
    const userId = decodedToken.userId.toString();
    const userRole = decodedToken.userRole.toString();
    req.auth = { userRole }
    if (userRole != 2) {
      throw 'Need Administrator access';
    } else {
      next();
    }
  } catch {
    res.status(403).json({
      error: 'Unauthorized request'
    });
  }
};