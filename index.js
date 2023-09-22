const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const quizRouter = require('./routes/quiz');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
const mongo_url = process.env.MONGO_URL;
const port = process.env.PORT || 5000;

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log('Connected to database successfully');
    app.listen(port, () => {
      console.log('server is running');
    });
  })
  .catch((error) => {
    console.log(`Error connecting to database: ${error}`);
  });

app.use('/api/users', userRouter);
app.use('/api/quiz', quizRouter);
