import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setQuery, setSort } from '../features/productsSlice';
import Button from './Button';

const categories = ['All', 'Footwear', 'Audio', 'Wearables'];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Top Rated' }
];

export default function FilterBar() {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);

  return (
    <div className="glass-panel flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
      <input
        type="search"
        placeholder="Search products"
        value={filters.query}
        onChange={(event) => dispatch(setQuery(event.target.value))}
        className="w-full rounded-full border border-transparent bg-white/60 px-5 py-3 text-sm shadow-inner outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-slate-800/60"
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <select
          value={filters.category}
          onChange={(event) => dispatch(setCategory(event.target.value))}
          className="rounded-full border border-transparent bg-white/70 px-4 py-3 text-sm font-medium shadow-inner outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-slate-800/80"
        >
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
        <select
          value={filters.sort}
          onChange={(event) => dispatch(setSort(event.target.value))}
          className="rounded-full border border-transparent bg-white/70 px-4 py-3 text-sm font-medium shadow-inner outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-slate-800/80"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Button variant="secondary" className="whitespace-nowrap">
          Filters
        </Button>
      </div>
    </div>
  );
}
