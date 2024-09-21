const express = require('express');
const { signUp, userLogin } = require('../controller/user.controller');
const {uploadImageController} = require("../controller/image.controller")
const upload = require("../utils/multer.config");
const { createPost } = require('../controller/post.controller');
const {authenticateToken} = require("../controller/jwt.controller")


const router = express.Router();

router.post('/signup', signUp)
router.post('/login', userLogin)

router.post('/file/upload', upload.single("file"), uploadImageController)
// router.get('/file/filename',getImage)
router.post('/create',authenticateToken,createPost)

module.exports = router;