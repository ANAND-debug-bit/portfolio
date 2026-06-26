import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

import DiagonalCarousel from './DiagonalCarousel';
import { cn } from '../lib/utils';
import type { Project } from '../data/projects';

const SWIPE_DISTANCE = 50; // px of horizontal travel before a swipe registers

// Tune the diagonal spread to the viewport so it stays bold on phones.
function useResponsiveLayout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return isMobile
    ? { slideSize: 230, rotationStep: 15, verticalStep: 62, inactiveScale: 0.7 }
    : { slideSize: 300, rotationStep: 17, verticalStep: 80, inactiveScale: 0.7 };
}

export default function ProjectsCarousel({
  projects,
  className,
}: {
  projects: Project[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const layout = useResponsiveLayout();
  const count = projects.length;

  const items = useMemo(
    () => projects.map((p) => ({ src: p.image, title: p.name, alt: p.name })),
    [projects],
  );

  const go = (dir: number) => setActive((i) => (i + dir + count) % count);

  // Swipe — horizontal OR diagonal. We only act when the horizontal travel is
  // meaningful relative to vertical, so a vertical page-scroll isn't hijacked.
  const handlePanEnd = (_e: unknown, info: PanInfo) => {
    const { x, y } = info.offset;
    if (Math.abs(x) < SWIPE_DISTANCE || Math.abs(x) < Math.abs(y) * 0.5) return;
    go(x < 0 ? 1 : -1); // swipe left / up-left → next, right / down-right → prev
  };

  const current = projects[active];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn('relative mx-auto w-full max-w-5xl px-5', className)}
    >
      {/* Swipe surface — pan-y lets the page still scroll vertically */}
      <motion.div
        className="h-[420px] touch-pan-y sm:h-[520px]"
        style={{ touchAction: 'pan-y' }}
        onPanEnd={handlePanEnd}
      >
        <DiagonalCarousel
          items={items}
          activeIndex={active}
          onActiveIndexChange={setActive}
          loop
          showControls={false}
          slideSize={layout.slideSize}
          rotationStep={layout.rotationStep}
          verticalStep={layout.verticalStep}
          inactiveScale={layout.inactiveScale}
          labelClassName="font-display italic text-base text-text-primary"
          imageClassName="rounded-2xl border border-stroke"
        />
      </motion.div>

      {/* Controls — below the image so nothing overlaps the active slide */}
      <div className="mt-2 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous project"
          onClick={() => go(-1)}
          className="inline-flex size-9 items-center justify-center rounded-full border border-stroke bg-surface/60 text-text-primary backdrop-blur-md transition-colors hover:bg-stroke/50"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div className="flex items-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-label={`Go to ${p.name}`}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => setActive(i)}
              className={cn(
                'h-2 rounded-full bg-text-primary transition-[width,opacity] duration-300',
                i === active ? 'w-7 opacity-100' : 'w-2 opacity-30',
              )}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next project"
          onClick={() => go(1)}
          className="inline-flex size-9 items-center justify-center rounded-full border border-stroke bg-surface/60 text-text-primary backdrop-blur-md transition-colors hover:bg-stroke/50"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Synced caption for the active project */}
      <div className="mx-auto mt-5 min-h-[96px] max-w-xl text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current?.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-accent">
              {current?.type}
            </span>
            <p className="mt-2 mb-3 text-muted">{current?.description}</p>
            {current?.link && (
              <a
                href={current.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-text-primary underline-offset-4 hover:underline"
              >
                View project <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
