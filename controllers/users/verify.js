const User = require('../../models/user');
const Token = require('../../models/token');

const verifyEmail = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: 'رابط غير صالح' });
    }

    const token = await Token.findOne({
      token: req.params.token,
    });

    if (!token) {
      return res.status(400).json({ message: 'رابط غير صالح' });
    }

    await User.updateOne(
      {
        _id: user._id,
      },
      { verified: true }
    );
    await Token.deleteOne({ userId: user._id });

    res.status(200).json({ message: 'تم تأكيد الايميل' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.verifyEmail = verifyEmail;
