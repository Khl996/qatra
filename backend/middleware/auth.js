const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Store = require('../models/Store');

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'غير مصرح' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.type === 'store') {
      req.store = await Store.findByPk(decoded.id);
    } else {
      req.user = await User.findByPk(decoded.id);
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'غير مصرح' });
  }
};

exports.adminMiddleware = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'sub-admin') {
      return res.status(403).json({ message: 'غير مصرح للمسؤولين فقط' });
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'غير مصرح' });
  }
};
