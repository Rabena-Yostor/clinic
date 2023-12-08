const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'yourSecretKey');
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error('JWT error:', error.message);
    } else if (error instanceof jwt.TokenExpiredError) {
      console.error('Token expired:', error.message);
    } else {
      console.error('Error verifying token:', error.message);
    }
    res.status(401).json({ error: 'Unauthorized' });
  }
};
module.exports = authenticateUser;