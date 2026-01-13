import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const Work: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    document.body.style.overflow = 'hidden';
    setSelectedProject(project);
  };

  const closeModal = () => {
    document.body.style.overflow = 'unset';
    setSelectedProject(null);
  };

  return (
    <section id="work" className="relative py-32 px-6 md:px-12 border-t border-white/10 bg-void">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-baseline justify-between mb-24"
        >
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">SELECTED WORKS</h3>
          <span className="hidden md:block font-mono text-sm text-tech">INDEX: 01 — 03</span>
        </motion.div>

        {/* Project List */}
        <div className="grid grid-cols-1 gap-24">
          {PROJECTS.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
            >
              
              {/* Index Number */}
              <div className="md:col-span-1 font-mono text-xs text-acid opacity-50 group-hover:opacity-100 transition-opacity">
                /{project.id}
              </div>

              {/* Content */}
              <div className="md:col-span-5 flex flex-col justify-between h-full py-2">
                <div>
                  <h4 className="text-3xl font-bold mb-4 group-hover:text-acid transition-colors duration-300">
                    {project.title}
                  </h4>
                  <div className="flex gap-4 font-mono text-xs text-tech mb-8 uppercase">
                    <span>{project.category}</span>
                    <span className="w-px h-3 bg-white/20" />
                    <span>{project.year}</span>
                  </div>
                  <p className="text-tech text-sm leading-relaxed max-w-md">
                    {project.description}
                  </p>
                </div>
                
                <motion.button 
                  onClick={() => openModal(project)}
                  className="interactive mt-12 w-fit flex items-center gap-4 text-sm font-mono uppercase hover:text-acid transition-colors group/btn"
                  whileHover={{ x: 10 }}
                >
                  <span>View Case Study</span>
                  <span className="group-hover/btn:translate-x-2 transition-transform duration-300">→</span>
                </motion.button>
              </div>

              {/* Image Preview */}
              <motion.div 
                className="md:col-span-6 overflow-hidden bg-void-light border border-white/5 relative aspect-video cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => openModal(project)}
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-50" />
                
                {/* Decorative Tech Overlay on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-acid animate-pulse" />
                  <div className="absolute bottom-4 left-4 font-mono text-[10px] text-acid">
                    IMG_RAW.0{project.id}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-void/90 backdrop-blur-md"
            />
            
            {/* Modal Card */}
            <motion.div
              layoutId={`project-${selectedProject.id}`}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[95vw] h-[90vh] md:max-w-6xl md:h-[80vh] bg-[#0A0A0A] border border-white/10 overflow-hidden flex flex-col md:flex-row z-[110] shadow-2xl shadow-black"
            >
              {/* Close Button - Fixed to modal container */}
              <button 
                onClick={closeModal}
                className="absolute top-0 right-0 z-50 w-16 h-16 flex items-center justify-center hover:bg-acid hover:text-void transition-colors interactive bg-black/50 backdrop-blur-sm border-l border-b border-white/10 text-white"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
                </svg>
              </button>

              {/* Modal Left Image */}
              <div className="relative w-full md:w-1/2 h-1/2 md:h-full bg-void-light border-b md:border-b-0 md:border-r border-white/10 overflow-hidden">
                 <motion.img 
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1 }}
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover grayscale opacity-80"
                />
                <div className="absolute top-6 left-6 font-mono text-xs text-acid bg-black/50 p-2 backdrop-blur-sm border border-acid/20">
                    <span className="animate-pulse">● LIVE FEED</span>
                </div>
                <div className="absolute bottom-6 left-6 font-mono text-xs text-white/50 bg-black/50 p-2 backdrop-blur-sm">
                  <div className="flex gap-4">
                    <span>RES: 4K</span>
                    <span>FPS: 60</span>
                    <span>ISO: 800</span>
                  </div>
                </div>
              </div>

              {/* Modal Right Content */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-12 flex flex-col justify-between overflow-y-auto bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-5">
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="w-2 h-2 bg-acid rounded-full animate-pulse" />
                    <span className="font-mono text-xs text-acid tracking-widest uppercase">System Online</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-white">
                    {selectedProject.title}
                  </h2>
                  
                  <div className="flex flex-wrap gap-2 mb-12">
                    {['React', 'WebGL', 'Three.js', 'Typescript'].map((tag) => (
                       <span key={tag} className="px-3 py-1 border border-white/10 text-[10px] font-mono uppercase text-tech hover:bg-white/5 transition-colors cursor-default">
                         {tag}
                       </span>
                    ))}
                  </div>

                  <p className="text-tech leading-relaxed text-lg mb-8 border-l-2 border-acid/50 pl-6">
                    {selectedProject.description} This project represents a breakthrough in digital interface design, combining real-time data processing with high-fidelity visual rendering. The architecture allows for sub-millisecond updates while maintaining a steady 60fps framerate.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                     <div className="p-4 border border-white/5 bg-white/5 hover:border-acid/30 transition-colors">
                        <span className="block text-xs font-mono text-tech mb-1">CLIENT</span>
                        <span className="block font-bold">Confidential</span>
                     </div>
                     <div className="p-4 border border-white/5 bg-white/5 hover:border-acid/30 transition-colors">
                        <span className="block text-xs font-mono text-tech mb-1">DURATION</span>
                        <span className="block font-bold">12 Weeks</span>
                     </div>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: '#CCFF00', color: '#000000' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 border border-white/20 text-white font-bold tracking-[0.2em] hover:border-acid transition-all uppercase font-mono text-sm interactive group relative overflow-hidden"
                >
                  <span className="relative z-10">Initialize Project</span>
                  <div className="absolute inset-0 bg-acid translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Work;