const express = require('express');
const { signUp } = require('../controller/user.controller');

const router = express.Router();

router.post('/signup', signUp)

module.exports = router;