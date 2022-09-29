const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

router.get('/:roomId/room', paymentController.getRoomPayments);
router.post('/', paymentController.makePayment);
router.post('/vote', paymentController.doVote);
router.patch('/vote', paymentController.doVoteAgain);
router.get('/:roomId/list', paymentController.getPaymentList);
router.get('/:roomId/result', paymentController.getPaymentResult);

module.exports = router;
