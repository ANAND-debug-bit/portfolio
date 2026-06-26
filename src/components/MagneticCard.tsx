import { useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface MagneticCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export default function MagneticCard({ children, className = "", style, ...props }: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion values for the cursor position relative to card center [-1, 1]
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mouse position in pixels from top-left for the radial glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [isHovered, setIsHovered] = useState(false);

  // Smooth springs for the magnetic pull
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Content movement (subtle)
  const contentX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const contentY = useTransform(smoothY, [-1, 1], [-10, 10]);

  // Subtle tilt for the whole card
  const rotateX = useTransform(smoothY, [-1, 1], [4, -4]);
  const rotateY = useTransform(smoothX, [-1, 1], [-4, 4]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate mouse position relative to center of card
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalized [-1, 1]
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    x.set(normalizedX);
    y.set(normalizedY);

    // Exact pixel coordinates for the glow
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        ...style
      }}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Soft Radial Glow that follows cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useTransform(
            () => `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(137,170,204,0.15), transparent 40%)`
          ),
        }}
      />

      {/* Content pulled magnetically */}
      <motion.div
        style={{
          x: contentX,
          y: contentY,
        }}
        className="relative z-10 h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
