import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';
import { toggleWishlist } from '../features/wishlistSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <motion.article
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-4 shadow-xl shadow-slate-900/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
        <img
          src={`${product.images?.[0]}?auto=format&fit=crop&w=640&q=80`}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <button
          onClick={() => dispatch(toggleWishlist(product))}
          className="absolute right-3 top-3 rounded-full bg-white/80 p-2 text-slate-900 shadow-lg transition hover:scale-110 dark:bg-slate-800/80 dark:text-white"
        >
          <FiHeart className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <Link to={`/product/${product._id}`} className="text-lg font-semibold text-slate-900 transition hover:text-primary dark:text-white">
            {product.name}
          </Link>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            {product.category}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-slate-900 dark:text-white">${product.price.toFixed(2)}</p>
            <div className="flex items-center gap-1 text-sm text-amber-500">
              <FiStar className="h-4 w-4" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>
          <motion.button
            onClick={() => dispatch(addToCart(product))}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-primary"
          >
            <FiShoppingCart className="h-4 w-4" />
            Add
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
