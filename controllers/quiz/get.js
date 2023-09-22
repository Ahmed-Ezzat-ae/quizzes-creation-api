const Quiz = require('../../models/quiz');
const User = require('../../models/user');

const getAvailableQuiz = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.user._id,
      email: req.user.email,
    });

    if (!user) {
      return res.status(401).json({ message: 'مستخدم غير صالح' });
    }

    const quizes = await Quiz.find({
      creator: { $ne: req.user._id },
    }).select('quizName');

    if (!quizes) {
      return res
        .status(404)
        .json({ message: 'لا توجد اختبارات متاحة حتى الان' });
    }

    res.status(200).json(quizes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuiz = async (req, res) => {
  const { id: quizId } = req.params;
  try {
    const user = await User.findOne({
      _id: req.user._id,
      email: req.user.email,
    });

    if (!user) {
      return res.status(401).json({ message: 'مستخدم غير صالح' });
    }

    const quiz = await Quiz.findOne({
      _id: quizId,
    }).select('-_id questions');

    if (!quiz) {
      return res
        .status(404)
        .json({ message: 'لا توجد اختبارات متاحة حتى الان' });
    }

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAvailableQuiz, getQuiz };
