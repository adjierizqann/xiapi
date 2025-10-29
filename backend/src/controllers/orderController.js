import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice
  });

  const createdOrder = await order.save();
  return res.status(201).json(createdOrder);
};

export const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'name email');
  return res.json(orders);
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  return res.json(orders);
};
