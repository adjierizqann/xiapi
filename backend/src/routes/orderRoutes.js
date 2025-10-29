import express from 'express';
import { createOrder, getOrders, getMyOrders } from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createOrder).get(protect, adminOnly, getOrders);
router.get('/mine', protect, getMyOrders);

export default router;
