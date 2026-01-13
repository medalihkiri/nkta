import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

const TextScramble: React.FC<TextScrambleProps> = ({ text, className, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let iteration = 0;
    let timer: any = null;

    const startScramble = () => {
      timer = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(timer);
        }

        iteration += 1 / 2; // Speed of decoding
      }, 30);
    };

    const initialDelay = setTimeout(startScramble, delay * 1000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(timer);
    };
  }, [text, delay]);

  return (
    <motion.span 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, delay: delay }}
    >
      {displayText}
    </motion.span>
  );
};

export default TextScramble;