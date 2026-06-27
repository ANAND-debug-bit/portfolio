import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

import { cn } from '../lib/utils';

/** Learn an image's orientation once it has loaded, so we can size the card. */
function useOrientation(src: string) {
  const [isPortrait, setIsPortrait] = useState<boolean | null>(null);
  useEffect(() => {
    let alive = true;
    const img = new Image();
    img.onload = () => {
      if (alive) setIsPortrait(img.naturalHeight > img.naturalWidth);
    };
    img.src = src;
    return () => {
      alive = false;
    };
  }, [src]);
  return isPortrait;
}

/**
 * A stacked, swipeable card carousel for a project's screenshots.
 * Drag or use the arrows to flip through the deck. Landscape screenshots get
 * a taller phone crop, then settle into their natural ratio on wider screens.
 */
export default function ProjectCarousel({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const swiperRef = useRef<SwiperRef>(null);
  const [active, setActive] = useState(0);
  // Size the deck to the cover image's shape: tall for phone apps, wide for web.
  const isPortrait = useOrientation(images[0]);

  if (images.length === 0) return null;

  const single = images.length === 1;

  const deckSize = isPortrait
    ? 'h-[min(76vh,660px)] min-h-[520px] w-[min(88vw,340px)] sm:h-[720px] sm:w-[374px] lg:h-[780px] lg:w-[405px]'
    : 'h-[340px] w-[calc(100vw-2rem)] max-w-[1120px] sm:aspect-[3418/1898] sm:h-auto sm:w-full';
  const imageClassName = isPortrait
    ? 'object-cover'
    : 'object-cover object-left-top sm:object-center';

  return (
    <div className="flex w-full flex-col items-center">
      <div className={cn('relative', deckSize)}>
        <Swiper
          ref={swiperRef}
          effect="cards"
          grabCursor={!single}
          modules={[EffectCards]}
          cardsEffect={{ slideShadows: false, perSlideOffset: 9, perSlideRotate: 3 }}
          allowTouchMove={!single}
          onSlideChange={(s) => setActive(s.activeIndex)}
          className="h-full w-full"
        >
          {images.map((src, i) => (
            <SwiperSlide
              key={src}
              className="overflow-hidden rounded-[1.35rem] border border-stroke bg-bg shadow-[0_22px_60px_-38px_rgba(0,0,0,0.65)]"
            >
              <img
                src={src}
                alt={`${alt} — image ${i + 1}`}
                className={cn('absolute inset-0 h-full w-full', imageClassName)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Controls — arrows + counter, only when there's more than one image. */}
      {!single && (
        <div className="mt-6 flex items-center gap-4">
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className="inline-flex size-10 items-center justify-center rounded-full border border-stroke bg-surface/60 text-text-primary backdrop-blur-md transition-colors hover:bg-stroke/50"
          >
            <ChevronLeft className="size-5" />
          </button>

          <span className="min-w-[3.5rem] text-center font-mono text-xs tracking-[0.2em] text-muted">
            {String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>

          <button
            type="button"
            aria-label="Next image"
            onClick={() => swiperRef.current?.swiper.slideNext()}
            className="inline-flex size-10 items-center justify-center rounded-full border border-stroke bg-surface/60 text-text-primary backdrop-blur-md transition-colors hover:bg-stroke/50"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
