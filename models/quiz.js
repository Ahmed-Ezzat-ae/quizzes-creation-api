const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    quizName: {
      type: String,
      required: true,
    },

    questions: [
      {
        question: String,
        options: [String],
        correctAnswer: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Quiz = model('Quiz', schema);
module.exports = Quiz;
