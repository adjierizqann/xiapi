import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import Loader from '../components/Loader';

const PER_PAGE = 6;

export default function Shop() {
  const { items, status, filters } = useSelector((state) => state.products);
  const [page, setPage] = useState(1);

  const filteredProducts = useMemo(() => {
    const query = filters.query.toLowerCase();
    let list = items.filter((product) => product.name.toLowerCase().includes(query));

    if (filters.category !== 'All') {
      list = list.filter((product) => product.category === filters.category);
    }

    switch (filters.sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return list;
  }, [items, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PER_PAGE));
  const paginated = filteredProducts.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-10">
      <FilterBar />

      {status === 'loading' ? (
        <Loader label="Fetching products" />
      ) : (
        <>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing {paginated.length} of {filteredProducts.length} products
          </p>
          {paginated.length === 0 ? (
            <div className="glass-panel p-12 text-center text-slate-500 dark:text-slate-400">
              No products found. Try adjusting your filters.
            </div>
          ) : (
            <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </motion.div>
          )}
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  page === index + 1
                    ? 'bg-slate-900 text-white shadow-lg dark:bg-primary'
                    : 'bg-white/70 text-slate-600 hover:bg-slate-200 dark:bg-slate-800/60 dark:text-slate-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
