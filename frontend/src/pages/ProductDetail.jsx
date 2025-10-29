import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiStar } from 'react-icons/fi';
import Button from '../components/Button';
import { addToCart } from '../features/cartSlice';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);
  const product = useMemo(() => items.find((item) => item._id === id), [items, id]);
  const [activeImage, setActiveImage] = useState(product?.images?.[0]);

  if (!product) {
    return (
      <div className="glass-panel space-y-6 p-10 text-center">
        <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">Product not found.</p>
        <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="space-y-4">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm font-medium text-slate-500">
          <FiArrowLeft /> Back
        </button>
        <motion.div
          className="glass-panel overflow-hidden rounded-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img
            src={`${activeImage}?auto=format&fit=crop&w=900&q=80`}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="flex gap-3">
          {product.images.map((image) => (
            <button
              key={image}
              onClick={() => setActiveImage(image)}
              className={`h-20 flex-1 overflow-hidden rounded-2xl border-2 transition ${
                activeImage === image ? 'border-primary' : 'border-transparent'
              }`}
            >
              <img src={`${image}?auto=format&fit=crop&w=200&q=80`} alt="Thumbnail" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-widest text-primary">{product.category}</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{product.name}</h2>
          <div className="mt-2 flex items-center gap-2 text-amber-500">
            <FiStar />
            <span className="text-sm font-semibold">{product.rating.toFixed(1)} / 5.0</span>
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-300">{product.description}</p>
        <div className="rounded-3xl bg-slate-100 p-6 dark:bg-slate-900">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">Pricing</p>
          <p className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">${product.price.toFixed(2)}</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Includes free shipping & 30-day returns.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => dispatch(addToCart(product))}>Add to Cart</Button>
          <Button variant="secondary" onClick={() => navigate('/checkout')}>
            Buy now with Stripe Test
          </Button>
        </div>
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Reviews</h3>
          <div className="space-y-3 rounded-3xl bg-white/60 p-6 dark:bg-slate-900/60">
            {[1, 2].map((review) => (
              <div key={review} className="space-y-1 border-b border-slate-200 pb-3 last:border-b-0 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Design Enthusiast</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Love the craftsmanship and attention to detail. The packaging felt premium and the product exceeded expectations!
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
