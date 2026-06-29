import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const snapshotsFont =
  "'Rosindale Display Condensed', 'Rosindale Display', 'Instrument Serif', Georgia, serif";

const explorations = [
  { id: 1, image: "/playground/coastal-lookout.jpg", alt: "Looking out over clear coastal water from the rocks", rotation: -5, col: 1 },
  { id: 2, image: "/playground/city-overlook.jpg", alt: "Watching city lights from a high overlook at dusk", rotation: 3, col: 2 },
  { id: 3, image: "/playground/img-1719.jpg", alt: "Travel snapshot from along the way", rotation: 2, col: 1 },
  { id: 4, image: "/playground/img-1897.jpg", alt: "Travel memory from along the way", rotation: -4, col: 2 },
  { id: 5, image: "/playground/img-2008.jpg", alt: "Scenic snapshot from along the way", rotation: -2, col: 1 },
  { id: 6, image: "/playground/img-6479.jpg", alt: "Portrait moment from along the way", rotation: 5, col: 2 },
  { id: 7, image: "/playground/img-7177.jpg", alt: "Landscape moment from along the way", rotation: -3, col: 1 },
];

type Snapshot = (typeof explorations)[number];

function SnapshotCard({
  item,
  registerCard,
}: {
  item: Snapshot;
  registerCard: (id: number, node: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={(node) => registerCard(item.id, node)}
      className="group relative isolate w-full max-w-[200px] aspect-square cursor-pointer pointer-events-auto will-change-transform md:max-w-[320px]"
      style={{ transform: `rotate(${item.rotation}deg)` }}
    >
      <div
        data-snapshot-glow
        aria-hidden="true"
        className="absolute -inset-8 -z-10 rounded-[2.5rem] opacity-0 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 62%, rgba(137,170,204,0.72), rgba(78,133,191,0.34) 38%, rgba(78,133,191,0) 72%)",
        }}
      />
      <div className="relative h-full w-full overflow-hidden rounded-3xl border border-[#89AACC]/20 bg-surface p-2 shadow-2xl transition-colors duration-500 group-hover:border-[#89AACC]/55">
        <div className="relative h-full w-full overflow-hidden rounded-2xl translate-z-0">
          <img
            src={item.image}
            alt={item.alt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div
            data-snapshot-sheen
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-[#BBDFFF]/40 to-transparent opacity-0 blur-sm"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-text-primary font-medium">View</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Explorations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
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

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      cards.forEach((card, index) => {
        const glow = card.querySelector<HTMLElement>('[data-snapshot-glow]');
        const sheen = card.querySelector<HTMLElement>('[data-snapshot-sheen]');
        if (!glow || !sheen) return;

        if (prefersReducedMotion) {
          gsap.set(glow, { autoAlpha: 0.24 });
          return;
        }

        const fromX = index % 2 === 0 ? -18 : 18;

        gsap.set(glow, { x: fromX, y: 42, scale: 0.72, autoAlpha: 0 });
        gsap.set(sheen, { xPercent: -130, autoAlpha: 0 });

        const glowTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 96%',
            end: 'bottom 18%',
            scrub: 0.75,
          },
        });

        glowTimeline
          .fromTo(
            card,
            { y: 58, scale: 0.94, filter: 'brightness(0.78) saturate(0.85)' },
            { y: 0, scale: 1, filter: 'brightness(1) saturate(1)', duration: 0.36, ease: 'power2.out' },
            0,
          )
          .to(glow, { x: 0, y: 0, scale: 1.08, autoAlpha: 0.9, duration: 0.34, ease: 'sine.out' }, 0)
          .to(glow, { y: -44, scale: 1.28, autoAlpha: 0.18, duration: 0.66, ease: 'sine.inOut' }, 0.34)
          .to(sheen, { xPercent: 145, autoAlpha: 0.62, duration: 0.42, ease: 'none' }, 0.08)
          .to(sheen, { autoAlpha: 0, duration: 0.26, ease: 'sine.out' }, 0.42);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const registerCard = (id: number, node: HTMLDivElement | null) => {
    cardRefs.current[id] = node;
  };

  return (
    <section ref={containerRef} className="relative min-h-[300vh] bg-bg overflow-hidden">
      
      {/* Pinned Layer (z-10) */}
      <div 
        ref={contentRef} 
        className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center pointer-events-none z-10 px-4"
      >
        <h2
          className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight text-text-primary text-center mb-6"
          style={{ fontFamily: snapshotsFont }}
        >
          Snapshots
        </h2>
        
        <p className="text-muted text-sm md:text-base text-center max-w-sm">
          Photo's from places I’ve been, things I’ve seen, and memories that made it out of the camera roll.
        </p>
      </div>

      {/* Parallax Layer (z-20) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
        <div className="max-w-[1400px] mx-auto w-full h-full px-4 md:px-10 lg:px-16 flex justify-between relative">
          
          {/* Column 1 */}
          <div ref={col1Ref} className="w-[45%] md:w-auto flex flex-col gap-24 md:gap-40 pt-[50vh]">
            {explorations.filter(e => e.col === 1).map((item) => (
              <SnapshotCard key={item.id} item={item} registerCard={registerCard} />
            ))}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="w-[45%] md:w-auto flex flex-col gap-32 md:gap-48 pt-[80vh] items-end">
            {explorations.filter(e => e.col === 2).map((item) => (
              <SnapshotCard key={item.id} item={item} registerCard={registerCard} />
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
