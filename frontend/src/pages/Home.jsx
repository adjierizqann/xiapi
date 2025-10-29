import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';

export default function Home() {
  const products = useSelector((state) => state.products.items);
  const featured = useMemo(() => products.slice(0, 3), [products]);

  return (
    <div className="space-y-16">
      <section className="hero-gradient glass-panel relative overflow-hidden px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-sm uppercase tracking-[0.5em] text-slate-500">Discover the future</p>
          <h1 className="mt-6 max-w-2xl text-4xl font-bold text-slate-900 sm:text-5xl dark:text-white">
            Elevate your lifestyle with products that blend design and innovation.
          </h1>
          <p className="mt-6 max-w-xl text-base text-slate-600 dark:text-slate-300">
            Shop curated collections from world-class brands. Experience premium quality, sustainability, and smart technology in
            every product.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button as={Link} to="/shop" className="bg-gradient-to-r from-primary to-emerald-500">
              Shop Now
            </Button>
            <Link to="/account" className="text-sm font-semibold text-slate-600 underline-offset-4 hover:underline dark:text-slate-300">
              Join Xiapi Membership
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
      </section>

      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Featured</h2>
          <Link to="/shop" className="text-sm font-medium text-primary hover:underline">
            Explore all products →
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      <section className="glass-panel grid gap-6 px-6 py-10 sm:grid-cols-3">
        {['Fast shipping', 'Premium support', 'Secure payments'].map((benefit) => (
          <div key={benefit} className="rounded-2xl bg-white/60 p-6 text-center shadow-inner dark:bg-slate-900/60">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">{benefit}</p>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Experience world-class service on every order with real-time tracking and dedicated support.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
