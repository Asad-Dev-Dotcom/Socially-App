const jwt = require('jsonwebtoken');
const SECRET = 'Hacker007';

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).send({ message: 'Token required' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).send({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ message: 'Invalid Token', status : false });
  }
};
