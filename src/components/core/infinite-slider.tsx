import type { CSSProperties, ReactNode } from 'react';

interface InfiniteSliderProps {
  children: ReactNode;
  speed?: number;
  speedOnHover?: number;
  gap?: number;
  className?: string;
}

export function InfiniteSlider({
  children,
  speed = 38,
  speedOnHover,
  gap = 24,
  className = '',
}: InfiniteSliderProps) {
  const style = {
    '--slider-duration': `${speed}s`,
    '--slider-hover-duration': `${speedOnHover ?? speed}s`,
    '--slider-gap': `${gap}px`,
  } as CSSProperties;

  return (
    <div
      className={`infinite-slider group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] ${className}`}
      style={style}
    >
      <div className="infinite-slider-track flex w-max items-center">
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" style={{ gap, paddingLeft: gap }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
