import { useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Button from '../components/Button';

const initialForm = {
  name: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
  cardNumber: '',
  expiry: '',
  cvc: ''
};

export default function Checkout() {
  const { total, items } = useSelector((state) => state.cart);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(form).some((value) => value.trim() === '')) {
      toast.error('Please complete all fields');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success('Payment processed in Stripe test mode!');
      setForm(initialForm);
      setSubmitting(false);
    }, 1200);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="glass-panel space-y-4 p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Shipping information</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-slate-500">Full name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-2xl border border-transparent bg-white/70 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-slate-900/70"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-slate-500">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-2xl border border-transparent bg-white/70 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-slate-900/70"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-slate-500">Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="mt-1 w-full rounded-2xl border border-transparent bg-white/70 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-slate-900/70"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-500">City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="mt-1 w-full rounded-2xl border border-transparent bg-white/70 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-slate-900/70"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-500">Postal code</label>
              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                className="mt-1 w-full rounded-2xl border border-transparent bg-white/70 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-slate-900/70"
              />
            </div>
          </div>
        </section>

        <section className="glass-panel space-y-4 p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Payment</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-3">
              <label className="text-sm font-medium text-slate-500">Card number</label>
              <input
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                placeholder="4242 4242 4242 4242"
                className="mt-1 w-full rounded-2xl border border-transparent bg-white/70 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-slate-900/70"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-500">Expiry</label>
              <input
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                placeholder="04/24"
                className="mt-1 w-full rounded-2xl border border-transparent bg-white/70 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-slate-900/70"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-500">CVC</label>
              <input
                name="cvc"
                value={form.cvc}
                onChange={handleChange}
                placeholder="123"
                className="mt-1 w-full rounded-2xl border border-transparent bg-white/70 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-slate-900/70"
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? 'Processing…' : `Pay $${total.toFixed(2)} with Stripe Test`}
          </Button>
        </section>
      </form>

      <aside className="glass-panel space-y-4 p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Order summary</h2>
        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
          {items.map((item) => (
            <li key={item._id} className="flex justify-between">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900 dark:border-slate-800 dark:text-white">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </aside>
    </div>
  );
}
