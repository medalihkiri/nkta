import React, { useEffect, useState, useRef } from 'react';

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  // Use ref for direct DOM manipulation for performance where possible, 
  // but React state for class toggling is cleaner here given the simplicity.
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e: MouseEvent) => {
      // Check if the target is interactive
      const target = e.target as HTMLElement;
      const isInteractive = target.tagName === 'A' || 
                            target.tagName === 'BUTTON' || 
                            target.closest('a') || 
                            target.closest('button') ||
                            target.classList.contains('interactive');
      
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main Cursor Dot */}
      <div 
        className={`fixed top-0 left-0 w-3 h-3 bg-acid rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out`}
        style={{
          transform: `translate(${position.x - 6}px, ${position.y - 6}px) scale(${isHovering ? 0 : 1})`,
        }}
      />
      
      {/* Magnetic/Hover Ring */}
      <div 
        className={`fixed top-0 left-0 border border-acid rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-300 ease-out flex items-center justify-center`}
        style={{
          width: isHovering ? '64px' : '24px',
          height: isHovering ? '64px' : '24px',
          transform: `translate(${position.x - (isHovering ? 32 : 12)}px, ${position.y - (isHovering ? 32 : 12)}px) scale(${isClicking ? 0.9 : 1})`,
          opacity: 1,
          borderColor: isHovering ? '#CCFF00' : 'rgba(204, 255, 0, 0.5)'
        }}
      >
        {/* Crosshair details usually visible on hover */}
        <div className={`w-[1px] h-2 bg-acid absolute top-0 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`w-[1px] h-2 bg-acid absolute bottom-0 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`w-2 h-[1px] bg-acid absolute left-0 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`w-2 h-[1px] bg-acid absolute right-0 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </>
  );
};

export default Cursor;