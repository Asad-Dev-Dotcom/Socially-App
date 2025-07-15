const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploads');
const verifyTokenMiddleware = require('../middlewares/verifyToken')
const postController = require('../controllers/post.controller')
const PostLikeComment = require('../controllers/postLikeComment.controller')
const savePost = require('../controllers/savePost.controller')


router.post(
  '/create',
  verifyTokenMiddleware.verifyToken,
  upload.array('media', 10),
  postController.create
);

router.get('/display', verifyTokenMiddleware.verifyToken, postController.display)

router.delete('/delete/:id', verifyTokenMiddleware.verifyToken, postController.delete)

router.post('/like', verifyTokenMiddleware.verifyToken, PostLikeComment.like)

router.post('/comment', verifyTokenMiddleware.verifyToken, PostLikeComment.comment)

router.delete('/unlike', verifyTokenMiddleware.verifyToken, PostLikeComment.unlike)

router.delete('/deleteComment', verifyTokenMiddleware.verifyToken, PostLikeComment.deleteComment)

router.get('/getPostInfo', verifyTokenMiddleware.verifyToken, PostLikeComment.get)

//SAVE POST FEATURE====

router.post('/save', verifyTokenMiddleware.verifyToken, savePost.save)

router.delete('/unsave', verifyTokenMiddleware.verifyToken, savePost.unsavePost)

router.get('/getAllSave/:id', verifyTokenMiddleware.verifyToken, savePost.getAllSave)

module.exports = router;
