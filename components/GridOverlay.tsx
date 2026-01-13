import React, { useEffect, useRef, useState } from 'react';

const GridOverlay: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base Grid */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundSize: '50px 50px',
          backgroundImage: 'linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)'
        }}
      />
      
      {/* Radar Glow Mask */}
      <div 
        className="absolute inset-0 bg-transparent transition-opacity duration-75"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.03), transparent 40%)`
        }}
      />
      
      {/* Vertical Guide Lines (Decorative) */}
      <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-flash opacity-[0.05] hidden md:block" />
      <div className="absolute top-0 bottom-0 right-12 w-[1px] bg-flash opacity-[0.05] hidden md:block" />
    </div>
  );
};

export default GridOverlay;