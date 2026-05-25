import React, { useRef, useState, useEffect } from 'react';

interface MouseFollowProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export const MouseFollow = ({
  children,
  strength = 15, // Higher means less movement
  className = ""
}: MouseFollowProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Only track if we are in the top part of the page
      if (window.scrollY > innerHeight) return;
      
      // Calculate offset from center
      const x = (clientX - innerWidth / 2) / strength;
      const y = (clientY - innerHeight / 2) / strength;
      
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: 'transform 0.15s ease-out',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};
