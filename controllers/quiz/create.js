const Quiz = require('../../models/quiz');
const User = require('../../models/user');

const createQuiz = async (req, res) => {
  const { quizName, questions } = req.body;
  try {
    const user = await User.findOne({
      _id: req.user._id,
      email: req.user.email,
    });

    if (!user) {
      return res.status(401).json({ message: 'مستخدم غير صالح' });
    }

    await Quiz.create({
      creator: req.user._id,
      quizName,
      questions,
    });
    res.status(201).json({ message: 'تم انشاء الاختبار بنجاح' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createQuiz;
