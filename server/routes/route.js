const express = require('express');
const { signUp, userLogin } = require('../controller/user.controller');
const {uploadImageController} = require("../controller/image.controller")
const upload = require("../utils/multer.config");
const { createPost, getAllPosts, getPostById, updatePost, deleteBlog } = require('../controller/post.controller');
const {authenticateToken} = require("../controller/jwt.controller");
const { newComment, deleteComment, getComments } = require('../controller/comment.controller');


const router = express.Router();

router.post('/signup', signUp)
router.post('/login', userLogin)

router.post('/file/upload', upload.single("file"), uploadImageController)
// router.get('/file/filename',getImage)
router.post('/create',authenticateToken,createPost)
router.get("/posts", authenticateToken, getAllPosts)
router.get('/post/:id', authenticateToken, getPostById)
router.put('/update/:id', authenticateToken, updatePost)
router.delete("/delete/:id", authenticateToken, deleteBlog)

router.post('/comment/new', authenticateToken, newComment)
router.get("/comments/:id", authenticateToken, getComments);
router.delete("/comment/delete/:id", authenticateToken, deleteComment);

module.exports = router;