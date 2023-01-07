const express = require('express');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const router = express.Router();

router.use(authController.protect);

router.post(
  '/createPost/images',
  postController.uploadPostImages,
  postController.resizePostImages,
  postController.createPost
);
router.post('/createPost', postController.createPost);
router.put('/:postID', postController.deletePost);
router.get('/getAllPosts', postController.getAllPosts);
router.get('/:postID', postController.getPost);

router.put('/:postID/reacts', postController.addReact);
router.post(
  '/addComment/:postID',
  postController.uploadCommentPhoto,
  postController.resizeCommentPhoto,
  postController.addComment
);
router.get('/:postID/reacts', postController.getReacts);

router.put('/comments/:commentID/like', postController.commentLike);
router.post(
  '/comments/:commentID/reply',
  postController.uploadCommentPhoto,
  postController.resizeCommentPhoto,
  postController.addCommentReply
);
router.get('/comments/:postID', postController.getComments);

module.exports = router;
