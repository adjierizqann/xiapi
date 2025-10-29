import Product from '../models/Product.js';
import productsData from '../data/products.json' assert { type: 'json' };

// GET /api/products
export const getProducts = async (req, res) => {
  const products = await Product.find({});
  if (!products.length) {
    return res.json({ products: productsData, count: productsData.length, source: 'seed' });
  }
  return res.json({ products, count: products.length, source: 'database' });
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  const fallback = productsData.find((item) => item._id === req.params.id);
  if (fallback) {
    return res.json(fallback);
  }
  return res.status(404).json({ message: 'Product not found' });
};

// POST /api/products
export const createProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name || 'Sample product',
    price: req.body.price || 0,
    description: req.body.description || 'Sample description',
    category: req.body.category || 'General',
    images: req.body.images || [],
    countInStock: req.body.countInStock || 0
  });

  const created = await product.save();
  return res.status(201).json(created);
};

// PUT /api/products/:id
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  Object.assign(product, req.body);
  const updated = await product.save();
  return res.json(updated);
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  await product.deleteOne();
  return res.json({ message: 'Product removed' });
};
