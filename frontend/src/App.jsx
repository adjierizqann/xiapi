import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import AdminDashboard from './pages/AdminDashboard';
import AuthPage from './pages/Auth';
import useTheme from './hooks/useTheme';
import { fetchProducts } from './features/productsSlice';

const MotionWrapper = ({ children }) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
    {children}
  </motion.div>
);

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <Navbar onToggleTheme={toggleTheme} theme={theme} />
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-10">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <MotionWrapper>
                    <Home />
                  </MotionWrapper>
                }
              />
              <Route
                path="/shop"
                element={
                  <MotionWrapper>
                    <Shop />
                  </MotionWrapper>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <MotionWrapper>
                    <ProductDetail />
                  </MotionWrapper>
                }
              />
              <Route
                path="/cart"
                element={
                  <MotionWrapper>
                    <CartPage />
                  </MotionWrapper>
                }
              />
              <Route
                path="/checkout"
                element={
                  <MotionWrapper>
                    <Checkout />
                  </MotionWrapper>
                }
              />
              <Route
                path="/account"
                element={
                  <MotionWrapper>
                    <Account />
                  </MotionWrapper>
                }
              />
              <Route
                path="/auth"
                element={
                  <MotionWrapper>
                    <AuthPage />
                  </MotionWrapper>
                }
              />
              <Route
                path="/admin"
                element={
                  <MotionWrapper>
                    <AdminDashboard />
                  </MotionWrapper>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </div>
  );
}
