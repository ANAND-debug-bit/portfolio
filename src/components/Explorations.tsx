import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const explorations = [
  { id: 1, image: "/playground/coastal-lookout.jpg", alt: "Looking out over clear coastal water from the rocks", rotation: -5, col: 1 },
  { id: 2, image: "/playground/city-overlook.jpg", alt: "Watching city lights from a high overlook at dusk", rotation: 3, col: 2 },
  { id: 3, image: "/playground/img-1719.jpg", alt: "Travel photo from the visual playground", rotation: 2, col: 1 },
  { id: 4, image: "/playground/img-1897.jpg", alt: "Travel memory from the visual playground", rotation: -4, col: 2 },
  { id: 5, image: "/playground/img-2008.jpg", alt: "Scenic photo from the visual playground", rotation: -2, col: 1 },
  { id: 6, image: "/playground/img-6479.jpg", alt: "Portrait moment from the visual playground", rotation: 5, col: 2 },
  { id: 7, image: "/playground/img-7177.jpg", alt: "Landscape moment from the visual playground", rotation: -3, col: 1 },
];

export default function Explorations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current || !col1Ref.current || !col2Ref.current) return;

    const ctx = gsap.context(() => {
      // Pin the center content
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      // Parallax Column 1 (moves faster upwards)
      gsap.to(col1Ref.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // Parallax Column 2 (moves slower downwards or upwards at different speed)
      gsap.to(col2Ref.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[300vh] bg-bg overflow-hidden">
      
      {/* Pinned Layer (z-10) */}
      <div 
        ref={contentRef} 
        className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center pointer-events-none z-10 px-4"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
          <div className="w-8 h-px bg-stroke" />
        </div>
        
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-body tracking-tight text-text-primary text-center mb-6">
          Visual <span className="font-display italic">playground</span>
        </h2>
        
        <p className="text-muted text-sm md:text-base text-center max-w-sm mb-8">
          A collection of experiments, concepts, and unreleased ideas.
        </p>

        <button className="pointer-events-auto rounded-full px-6 py-3 bg-surface border border-stroke text-text-primary hover:bg-text-primary hover:text-bg transition-colors duration-300">
          Follow on Dribbble
        </button>
      </div>

      {/* Parallax Layer (z-20) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
        <div className="max-w-[1400px] mx-auto w-full h-full px-4 md:px-10 lg:px-16 flex justify-between relative">
          
          {/* Column 1 */}
          <div ref={col1Ref} className="w-[45%] md:w-auto flex flex-col gap-24 md:gap-40 pt-[50vh]">
            {explorations.filter(e => e.col === 1).map((item) => (
              <div 
                key={item.id}
                className="w-full max-w-[200px] md:max-w-[320px] aspect-square rounded-3xl overflow-hidden pointer-events-auto cursor-pointer border border-stroke bg-surface p-2 shadow-2xl"
                style={{ transform: `rotate(${item.rotation}deg)` }}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden relative group translate-z-0">
                  <img src={item.image} alt={item.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-text-primary font-medium">View</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="w-[45%] md:w-auto flex flex-col gap-32 md:gap-48 pt-[80vh] items-end">
            {explorations.filter(e => e.col === 2).map((item) => (
              <div 
                key={item.id}
                className="w-full max-w-[200px] md:max-w-[320px] aspect-square rounded-3xl overflow-hidden pointer-events-auto cursor-pointer border border-stroke bg-surface p-2 shadow-2xl"
                style={{ transform: `rotate(${item.rotation}deg)` }}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden relative group translate-z-0">
                  <img src={item.image} alt={item.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-text-primary font-medium">View</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
