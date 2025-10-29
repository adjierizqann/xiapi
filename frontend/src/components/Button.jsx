import { motion } from 'framer-motion';
import clsx from 'clsx';

const baseStyles =
  'inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-transparent';

export default function Button({
  children,
  variant = 'primary',
  className = '',
  as: Component = 'button',
  ...props
}) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-light',
    secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-700 dark:text-white',
    ghost: 'bg-transparent text-primary hover:bg-primary/10'
  };

  const button = (
    <Component className={clsx(baseStyles, variants[variant], className)} {...props}>
      {children}
    </Component>
  );

  if (Component === 'button') {
    return (
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={clsx(baseStyles, variants[variant], className)} {...props}>
        {children}
      </motion.button>
    );
  }

  return button;
}
