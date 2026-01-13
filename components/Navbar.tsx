import React from 'react';
import { motion } from 'framer-motion';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 md:px-12 md:py-8 flex justify-between items-start mix-blend-difference text-flash">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-1"
      >
        <h1 className="text-xl font-bold tracking-tighter leading-none">NOKTA</h1>
        <span className="text-[10px] font-mono opacity-60">SYSTEM.V.1.0</span>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-12">
        {NAV_ITEMS.map((item, index) => (
          <motion.a
            key={item.id}
            href={item.href}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + (index * 0.1), ease: [0.16, 1, 0.3, 1] }}
            className="group relative text-sm font-mono uppercase tracking-widest hover:text-acid transition-colors duration-300"
          >
            <span className="relative z-10">{item.label}</span>
            <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-acid opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;