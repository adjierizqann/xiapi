import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiMoon, FiSun, FiUser } from 'react-icons/fi';
import Button from './Button';

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/account', label: 'Account' },
  { to: '/admin', label: 'Admin' }
];

export default function Navbar({ onToggleTheme, theme }) {
  const cartCount = useSelector((state) => state.cart.items.length);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-950/70 border-b border-white/20 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-emerald-500 text-white font-semibold"
          >
            Xi
          </motion.div>
          <span className="text-xl font-semibold tracking-tight">Xiapi Commerce</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition hover:text-primary ${isActive ? 'text-primary' : 'text-slate-600 dark:text-slate-300'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
          </Button>
          <NavLink to="/account" className="hidden rounded-full bg-slate-200/70 p-2 hover:bg-slate-300 dark:bg-slate-800 md:block">
            <FiUser className="h-5 w-5" />
          </NavLink>
          <NavLink to="/cart" className="relative rounded-full bg-slate-900 p-3 text-white shadow-lg">
            <FiShoppingBag className="h-5 w-5" />
            {(cartCount > 0 || wishlistCount > 0) && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-emerald-500 text-[10px] font-semibold text-white">
                {cartCount + wishlistCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
}
