const express = require('express');
const { userLogin } = require('../controllers/users/login');
const { userRegister } = require('../controllers/users/register');
const { verifyEmail } = require('../controllers/users/verify');
const router = express.Router();

router.post("/signin", userLogin);
router.post("/signup", userRegister);
router.get("/:id/verify/:token", verifyEmail)

module.exports = router