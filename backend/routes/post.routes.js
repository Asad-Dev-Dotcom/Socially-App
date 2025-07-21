const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploads');
const verifyTokenMiddleware = require('../middlewares/verifyToken')
const postController = require('../controllers/post.controller')
const PostLikeComment = require('../controllers/postLikeComment.controller')
const savePost = require('../controllers/savePost.controller')

//POST CREATE READ UPDATE DELETE====
router.post(
  '/create',
  verifyTokenMiddleware.verifyToken,
  upload.array('media', 10),
  postController.create
);

router.get('/display', verifyTokenMiddleware.verifyToken, postController.display)

router.delete('/delete/:id', verifyTokenMiddleware.verifyToken, postController.delete)

router.put('/update', upload.fields([{ name : 'newMedia', maxCount : 10 }]), verifyTokenMiddleware.verifyToken, postController.update)




// POST ---- LIKE ---- UNLIKE ---- COMMENT ---- UNCOMMENT ---- GETALL

router.post('/like', verifyTokenMiddleware.verifyToken, PostLikeComment.like)

router.delete('/unlike', verifyTokenMiddleware.verifyToken, PostLikeComment.unlike)

router.get('/getPostInfo/:id', verifyTokenMiddleware.verifyToken, PostLikeComment.getLikedPosts)



// POST --- COMMENT ---- DELETE COMMENT ---- EDIT COMMENT ---- GETALL

router.post('/comment', verifyTokenMiddleware.verifyToken, PostLikeComment.comment)

router.delete('/deleteComment', verifyTokenMiddleware.verifyToken, PostLikeComment.deleteComment)

router.get('/getAllComments/:id', verifyTokenMiddleware.verifyToken, PostLikeComment.getAllComments)


router.put('/editComment', verifyTokenMiddleware.verifyToken, PostLikeComment.editComment)

router.get('/getAllCommentsCount', verifyTokenMiddleware.verifyToken, PostLikeComment.getAllCommentsCount)



//SAVE POST FEATURE====

router.post('/save', verifyTokenMiddleware.verifyToken, savePost.save)

router.delete('/unsave', verifyTokenMiddleware.verifyToken, savePost.unsavePost)

router.get('/getAllSave/:id', verifyTokenMiddleware.verifyToken, savePost.getAllSave)

module.exports = router;
