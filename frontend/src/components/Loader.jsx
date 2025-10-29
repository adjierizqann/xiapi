import { motion } from 'framer-motion';

export default function Loader({ label = 'Loading' }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-16 text-slate-500">
      <motion.div
        className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
      />
      <p className="text-sm font-medium tracking-wide">{label}…</p>
    </div>
  );
}
