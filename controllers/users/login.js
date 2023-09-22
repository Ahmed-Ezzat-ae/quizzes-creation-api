const User = require('../../models/user');
const Token = require('../../models/token');
const bcrypt = require('bcryptjs');
const generateToken = require('../../utils/generateToken');
const sendEmail = require('../../utils/sendEmail');

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'مستخدم غير موجود' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'كلمة المرور خاطئة' });
    }

    if (!user.verified) {
      let token = await Token.findById(user._id);
      if (!token) {
        token = new Token({
          token: generateToken(user._id),
          userId: user._id,
        }).save();

        const url = `${process.env.FRONTEND_URL}/users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, 'verify email', url);
      }
      return res.status(400).json({ message: 'يجب تاكيد الايميل' });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      message: 'تم تسجيل دخولك بنجاح',
      token,
      user: {
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  userLogin,
};
