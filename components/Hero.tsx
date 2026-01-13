import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TextScramble from './TextScramble';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let time = 0;
    
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    const gridSize = 40;
    const waveAmplitude = 50;

    const animate = () => {
      time += 0.02;
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = '#222';
      ctx.lineWidth = 1;

      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) { 
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 400;
          
          let distortion = 0;
          
          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * waveAmplitude;
            distortion = force * Math.sin(dist * 0.05 - time * 2);
          }

          const ambient = Math.sin(x * 0.01 + time) * 5;
          const yPos = y + distortion + ambient;
          
          if (x === 0) ctx.moveTo(x, yPos);
          else ctx.lineTo(x, yPos);
        }
        ctx.stroke();
      }
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <motion.canvas 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5 }}
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />
      
      <div className="relative z-10 text-center pointer-events-none mix-blend-difference">
        <h2 className="text-[12vw] leading-[0.8] font-bold tracking-tighter text-flash select-none">
          <TextScramble text="DIGITAL" delay={0.2} />
          <br />
          <TextScramble text="ALCHEMY" delay={0.6} />
        </h2>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="mt-8 flex justify-between items-center w-full max-w-md mx-auto px-4"
        >
          <span className="font-mono text-xs text-acid">[ EST. 2024 ]</span>
          <span className="font-mono text-xs text-tech max-w-[150px] text-right">
            PRECISION ENGINEERING FOR THE VIRTUAL VOID
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;