const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logOut);
router
  .route('/forgotPassword')
  .get(authController.findUser)
  .post(authController.forgotPassword);

router
  .route('/resetPassword')
  .post(authController.validateResetCode)
  .patch(authController.resetPassword);

// PROTECT ALL ROUTES AFTER THIS MIDDLEWARE
router.use(authController.protect);

router.put('/ping', authController.ping);
router.post('/emailVerification', authController.activateAccount);
router.post('/resendEmailVerifivation', authController.resendEmailVerification);

router.get('/getProfile/:username', userController.getProfile);
router.get('/getProfile/:username/photos', userController.getPhotos);
router.get('/getProfile/:username/posts', userController.getUserPosts);
router.put('/update/profile/details', userController.updateDetails);
router.post(
  '/update/profile/photo',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updatePhoto
);
router.post(
  '/update/profile/cover',
  userController.uploadUserPhoto,
  userController.resizeUserCover,
  userController.updateCover
);

router.get('/notifications', userController.getNotification);
router.put('/notifications/:nid/seen', userController.seenNotification);

router.get('/search', userController.getSearchHistory);
router.post('/search', userController.searchUsers);
router.post('/search/add', userController.addToSearchHistory);
router.post('/search/remove', userController.removeFromSearch);
router.post('/fcm', userController.addFCM);

module.exports = router;
