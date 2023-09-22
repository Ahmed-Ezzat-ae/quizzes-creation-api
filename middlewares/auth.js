const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      let decoded = null;
      decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      if (!decoded.userId) {
        return res.status(401).json({ message: 'مستخدم غير موثوق' });
      }

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    }

    if (!token) {
      return res.status(401).json({ message: 'مستخدم غير موثوق' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.protect = protect;

// req.user {
//     _id: new ObjectId("650767081d7c470ce0b95342"),
//     username: 'Ahmed',
//     email: 'ahmed.alp824.ae@gmail.com',
//     verified: true,
//     __v: 0
//   }
