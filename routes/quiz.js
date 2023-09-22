const express = require('express');
const { protect } = require('../middlewares/auth');
const createQuiz = require('../controllers/quiz/create');
const {getAvailableQuiz, getQuiz} = require('../controllers/quiz/get');
const router = express.Router();

router.post('/', protect, createQuiz);
router.get('/', protect, getAvailableQuiz);
router.get('/:id', protect, getQuiz);

module.exports = router;
