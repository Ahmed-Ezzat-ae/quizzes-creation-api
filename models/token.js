const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },

    //   createdAt: {
    //     type: Date,
    //     default: Date.now(),
    //     expires: '1d',
    //   },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Token = model('Token', schema);
module.exports = Token;
