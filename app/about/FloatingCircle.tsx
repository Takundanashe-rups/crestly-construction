import { motion } from 'framer-motion';
import React from 'react';

interface FloatingCircleProps {
  className: string;
  delay: number;
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  'aria-hidden'?: boolean;
}


const FloatingCircle: React.FC<FloatingCircleProps> = ({
  className,
  delay,
  y = 25,
  x = 10,
  scale = 1,
  duration = 5,
  ...rest
}) => (
  <motion.div
    className={className + ' will-change-transform'}
    initial={{ y: 0, x: 0, scale: 1 }}
    animate={{ y: [0, y, 0], x: [0, x, 0], scale: [1, scale, 1] }}
    transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    {...rest}
  />
);

export default FloatingCircle;
