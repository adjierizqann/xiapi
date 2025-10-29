import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Button from '../components/Button';
import { login, register } from '../features/authSlice';

const tabs = [
  { id: 'login', label: 'Login' },
  { id: 'register', label: 'Register' }
];

export default function AuthPage() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);
  const [activeTab, setActiveTab] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (activeTab === 'login') {
        await dispatch(login({ email: form.email, password: form.password })).unwrap();
        toast.success('Welcome back!');
      } else {
        await dispatch(register(form)).unwrap();
        toast.success('Account created successfully!');
      }
    } catch (error) {
      toast.error(error?.message || 'Authentication failed');
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg space-y-6">
      <div className="glass-panel p-8">
        <div className="flex gap-2 rounded-full bg-slate-200/70 p-1 dark:bg-slate-800/70">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${
                activeTab === tab.id ? 'text-slate-900 dark:text-white' : 'text-slate-500'
              }`}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="auth-tab"
                  className="absolute inset-0 rounded-full bg-white shadow dark:bg-slate-900"
                  transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                />
              )}
              <span className="relative">{tab.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {activeTab === 'register' && (
            <div>
              <label className="text-sm font-medium text-slate-500">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-2xl border border-transparent bg-white/70 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-slate-900/70"
              />
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-slate-500">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-2xl border border-transparent bg-white/70 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-slate-900/70"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-500">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-2xl border border-transparent bg-white/70 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-slate-900/70"
            />
          </div>
          <Button type="submit" className="w-full" disabled={status === 'loading'}>
            {status === 'loading' ? 'Processing…' : activeTab === 'login' ? 'Login' : 'Create account'}
          </Button>
        </form>
      </div>
      <p className="text-center text-xs text-slate-400">Using JWT-based authentication powered by the Xiapi API.</p>
    </div>
  );
}
