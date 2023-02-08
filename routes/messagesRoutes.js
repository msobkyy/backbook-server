const express = require('express');

const authController = require('../controllers/authController');
const messagesController = require('../controllers/messagesController');

const router = express.Router();

// PROTECT ALL ROUTES AFTER THIS MIDDLEWARE
router.use(authController.protect);

router.get('/:chatId', messagesController.getMessages);
router.put('/:chatId/send', messagesController.sendMessage);
router.put('/:msgId/seen', messagesController.seenMessage);

module.exports = router;
