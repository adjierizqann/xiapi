import { useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Button from '../components/Button';

export default function AdminDashboard() {
  const products = useSelector((state) => state.products.items);
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: 'Footwear',
    description: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.price) {
      toast.error('Name and price are required');
      return;
    }
    toast.success('Product saved (mock)');
    setForm({ name: '', price: '', category: 'Footwear', description: '' });
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Admin dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage product catalog, monitor orders, and review analytics.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[{ label: 'Revenue', value: '$12.4K' }, { label: 'Orders', value: '128' }, { label: 'Conversion', value: '4.7%' }].map(
            (stat) => (
              <div key={stat.label} className="glass-panel p-4 text-center">
                <p className="text-xs uppercase tracking-widest text-slate-400">{stat.label}</p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{stat.value}</p>
              </div>
            )
          )}
        </div>
      </header>

      <section className="glass-panel space-y-4 p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Create / edit product</h2>
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-slate-500">Product name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-2xl border border-transparent bg-white/70 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-slate-900/70"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-500">Price</label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              className="mt-1 w-full rounded-2xl border border-transparent bg-white/70 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-slate-900/70"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-500">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="mt-1 w-full rounded-2xl border border-transparent bg-white/70 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-slate-900/70"
            >
              <option>Footwear</option>
              <option>Audio</option>
              <option>Wearables</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-slate-500">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 w-full rounded-2xl border border-transparent bg-white/70 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-slate-900/70"
            />
          </div>
          <Button type="submit" className="sm:col-span-2">
            Save product
          </Button>
        </form>
      </section>

      <section className="glass-panel space-y-4 p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Catalog</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-widest text-slate-500">
              <tr>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {products.map((product) => (
                <tr key={product._id} className="transition hover:bg-white/40 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{product.name}</td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{product.category}</td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-300">${product.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="glass-panel space-y-4 p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Recent orders</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">No orders yet. Orders from the backend will appear here.</p>
      </section>
    </div>
  );
}
