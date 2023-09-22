const jwt = require('jsonwebtoken');

function generateToken(userId) {
  return jwt.sign(
    {
      userId,
    },
    process.env.TOKEN_SECRET
  );
}

module.exports = generateToken;
