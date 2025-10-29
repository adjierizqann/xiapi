import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { logout } from '../features/authSlice';

export default function Account() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!user) {
    return (
      <div className="glass-panel flex flex-col items-center gap-4 p-12 text-center">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Welcome to Xiapi</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Sign in or create an account to track orders, manage favorites, and access member-only drops.
        </p>
        <Button as={Link} to="/auth">
          Sign in / Register
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="glass-panel space-y-4 p-8">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Profile</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage your contact details and preferences.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">Name</p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{user.name}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">Email</p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{user.email}</p>
          </div>
        </div>
        <Button variant="secondary" onClick={() => dispatch(logout())}>
          Logout
        </Button>
      </div>

      <div className="glass-panel space-y-4 p-8">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Order history</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">You have no orders yet. Checkout to experience Xiapi fulfillment.</p>
      </div>
    </div>
  );
}
