import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import Button from '../components/Button';
import { removeFromCart, updateQuantity, clearCart } from '../features/cartSlice';

export default function CartPage() {
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: Number(quantity) }));
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Your cart</h1>
        {items.length > 0 && (
          <button className="text-sm text-red-500" onClick={() => dispatch(clearCart())}>
            Clear cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="glass-panel p-12 text-center text-slate-500 dark:text-slate-400">
          Your cart is empty. Explore our collections in the shop.
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <ul className="space-y-6">
            {items.map((item) => (
              <li key={item._id} className="flex gap-6 rounded-3xl bg-white/70 p-5 shadow-sm dark:bg-slate-900/70">
                <img
                  src={`${item.images?.[0]}?auto=format&fit=crop&w=200&q=80`}
                  alt={item.name}
                  className="h-32 w-32 rounded-2xl object-cover"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">{item.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">${item.price.toFixed(2)}</p>
                    </div>
                    <button onClick={() => dispatch(removeFromCart(item._id))} className="text-slate-400 hover:text-red-500">
                      <FiTrash2 />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="text-xs uppercase tracking-wider text-slate-400">Qty</label>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) => handleQuantityChange(item._id, event.target.value)}
                      className="w-20 rounded-full border border-transparent bg-slate-100 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-slate-800"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="glass-panel space-y-4 p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Summary</h2>
            <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900 dark:border-slate-800 dark:text-white">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button onClick={() => navigate('/checkout')} className="w-full">
              Proceed to Checkout
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}
