const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploads');
const verifyTokenMiddleware = require('../middlewares/verifyToken')
const postController = require('../controllers/post.controller')


router.post(
  '/create',
  verifyTokenMiddleware.verifyToken,
  upload.array('media', 10),
  postController.create
);

router.get('/display', verifyTokenMiddleware.verifyToken, postController.display)

router.delete('/delete/:id', verifyTokenMiddleware.verifyToken, postController.delete)

module.exports = router;
