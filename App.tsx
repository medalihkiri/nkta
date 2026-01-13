import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cursor from './components/Cursor';
import GridOverlay from './components/GridOverlay';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate system boot
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative bg-void text-flash min-h-screen selection:bg-acid selection:text-void overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center font-mono"
            exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          >
            <div className="flex flex-col items-center gap-4">
               <motion.div 
                 className="w-16 h-16 border border-acid/30 flex items-center justify-center relative"
                 animate={{ rotate: 360 }}
                 transition={{ duration: 2, ease: "linear", repeat: Infinity }}
               >
                 <div className="w-8 h-8 bg-acid/10" />
                 <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-acid" />
                 <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-acid" />
               </motion.div>
               <div className="flex flex-col items-center text-xs tracking-widest text-acid/80 gap-1">
                 <motion.span
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
                 >
                   SYSTEM INITIALIZING
                 </motion.span>
                 <span className="text-[10px] text-tech opacity-50">V.1.04.2 BETA</span>
               </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="content" className="relative z-10">
            {/* UI Layer */}
            <Cursor />
            <GridOverlay />
            <Navbar />

            {/* Content Layer */}
            <div className="relative z-10">
              <Hero />
              <Work />
              <Footer />
            </div>

            {/* Noise Grain Overlay for texture */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[60] mix-blend-overlay" 
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default App;