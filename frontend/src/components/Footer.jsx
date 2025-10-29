import { Link } from 'react-router-dom';

const footerLinks = [
  { title: 'Shop', items: ['Men', 'Women', 'Accessories'] },
  { title: 'Support', items: ['Contact', 'FAQs', 'Orders'] },
  { title: 'Company', items: ['About', 'Careers', 'Press'] }
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80 py-12 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">Xiapi</p>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Curating the future of commerce with thoughtful design, premium products, and delightful experiences.
          </p>
        </div>
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {section.title}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {section.items.map((item) => (
                <li key={item}>
                  <Link to="#" className="transition hover:text-primary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-12 text-center text-xs text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} Xiapi. All rights reserved.</p>
    </footer>
  );
}
