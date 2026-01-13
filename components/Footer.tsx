import React from 'react';
import { motion } from 'framer-motion';
import { CONTACT_EMAIL, STUDIO_COORDS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative py-24 px-6 md:px-12 border-t border-white/10 bg-void overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12 relative z-10">
        
        <div className="flex flex-col gap-8">
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[12vw] md:text-[8vw] leading-none font-bold tracking-tighter text-white/10 hover:text-white/20 transition-colors select-none"
          >
            NOKTA
          </motion.h2>
          <div className="flex flex-col gap-2 font-mono text-sm text-tech">
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-acid transition-colors interactive w-fit">
              {CONTACT_EMAIL}
            </a>
            <span>{STUDIO_COORDS}</span>
          </div>
        </div>

        <div className="flex gap-8 font-mono text-xs uppercase tracking-widest text-tech">
          {['Instagram', 'Twitter', 'LinkedIn'].map((social, i) => (
             <motion.a 
                key={social}
                href="#" 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="hover:text-flash transition-colors interactive"
             >
               {social}
             </motion.a>
          ))}
        </div>
      </div>

      <div className="w-full mt-24 pt-8 border-t border-white/5 flex justify-between font-mono text-[10px] text-white/20 uppercase">
        <span>© {new Date().getFullYear()} NOKTA STUDIO.</span>
        <span>ALL RIGHTS RESERVED.</span>
      </div>
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-noktaBlue/10 blur-[120px] rounded-full pointer-events-none" />
    </footer>
  );
};

export default Footer;