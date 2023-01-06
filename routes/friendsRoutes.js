const express = require('express');
const friendsController = require('../controllers/friendsController');
const authController = require('../controllers/authController');

const router = express.Router();

// PROTECT ALL ROUTES AFTER THIS MIDDLEWARE
router.use(authController.protect);

router.put('/add/:id', friendsController.addFriend);
router.put('/cancel/:friendRequestId', friendsController.cancelRequest);
router.put('/acceptRequest/:friendRequestId', friendsController.acceptRequest);
router.put('/remove/:friendRequestId', friendsController.removeFriend);
router.put('/follow/:id', friendsController.follow);
router.put('/unfollow/:id', friendsController.unfollow);
router.get('/friendsPage', friendsController.getFriends);

module.exports = router;
