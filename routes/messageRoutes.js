const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/', messageController.sendMessage);
router.get('/:receiver', messageController.receiveMessages);
router.get('/status/:id', messageController.checkMessageStatus);
router.put('/status/:id', messageController.updateMessageStatus);

module.exports = router;
