const User = require('../../models/user');
const Token = require('../../models/token');
const bcrypt = require('bcryptjs');
const generateToken = require('../../utils/generateToken');
const sendEmail = require('../../utils/sendEmail');

const userRegister = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({
      email,
    });

    if (user) {
      return res.status(400).json({ message: 'المستخدم موجود بالفعل' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      ...req.body,
      password: hashPassword,
    });

    const token = await Token.create({
      userId: user._id,
      token: generateToken(user._id.toString()),
    });

    const url = `${process.env.FRONTEND_URL}/users/${user._id}/verify/${token.token}`;

    await sendEmail(email, 'Verify email', url);
    res.status(201).json({ message: 'لقد تم ارسال رابط يجب تأكيد الايميل' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.userRegister = userRegister;
