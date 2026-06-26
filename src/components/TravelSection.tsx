import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const trips = [
  {
    num: "01",
    place: "Greece",
    date: "April 2026",
    note: "Island air, ancient streets, and blue water days.",
    images: [
      { src: "/travel/greece/santorini-caldera.jpg", alt: "White Santorini buildings above the sea" },
      { src: "/travel/greece/meteora-cliffs.jpg", alt: "Meteora cliffs and monastery in Greece" },
      { src: "/travel/greece/oia-hillside.jpg", alt: "Oia hillside with white buildings and windmills" },
    ],
  },
  {
    num: "02",
    place: "Cruise",
    date: "February 2026",
    note: "Open ocean, sunsets, and a floating reset.",
    images: [
      { src: "/travel/cruise/ship-port.jpg", alt: "Cruise ship docked at port" },
      { src: "/travel/cruise/island-harbor.jpg", alt: "Turquoise island harbor from above" },
      { src: "/travel/cruise/cruise-drinks.jpg", alt: "Two drinks at a cruise bar" },
    ],
  },
  {
    num: "03",
    place: "Florida",
    date: "December 2025",
    note: "Warm winter light and time away from the usual rhythm.",
    images: [
      { src: "/travel/florida-2025/foggy-beach.jpg", alt: "Foggy Florida beach with waves rolling in" },
      { src: "/travel/florida-2025/ocean-sunset.jpg", alt: "Orange sunset over the ocean in Florida" },
      { src: "/travel/florida-2025/coastal-road.jpg", alt: "Coastal Florida road under a bright sky" },
    ],
  },
  {
    num: "04",
    place: "Cancun",
    date: "April 2025",
    note: "Clear water, bright days, and a proper spring escape.",
    images: [
      { src: "/travel/cancun/palm-drive.jpg", alt: "Palm trees along a resort drive in Cancun" },
      { src: "/travel/cancun/night-pool.jpg", alt: "Resort pool glowing at night in Cancun" },
      { src: "/travel/cancun/dinner-table.jpg", alt: "Dinner table with dishes and drinks in Cancun" },
    ],
  },
  {
    num: "05",
    place: "Florida",
    date: "December 2024",
    note: "A familiar place with a fresh end-of-year feeling.",
    images: [
      { src: "/travel/florida-2024/aquarium-show.jpg", alt: "Aquarium show in Florida" },
      { src: "/travel/florida-2024/neon-reef.jpg", alt: "Colorful neon reef scene in Florida" },
      { src: "/travel/florida-2024/everglades-trail.jpg", alt: "Everglades trail by the water in Florida" },
    ],
  },
  {
    num: "06",
    place: "India",
    date: "Summer 2024",
    note: "Family, culture, heat, color, and memories that stick.",
    images: [
      { src: "/travel/india/hill-view.jpg", alt: "Green hills and cloudy sky in India" },
      { src: "/travel/india/street-food.jpg", alt: "Street food being served in India" },
      { src: "/travel/india/temple-street.jpg", alt: "Temple street scene in India" },
    ],
  },
  {
    num: "07",
    place: "New York",
    date: "December 2023",
    note: "Winter city energy, lights, walking, and loud streets.",
    images: [
      { src: "/travel/new-york/stock-exchange-studio.jpg", alt: "Stock exchange studio in New York" },
      { src: "/travel/new-york/temple-exterior.jpg", alt: "Temple exterior visited during the New York trip" },
      { src: "/travel/new-york/times-square-night.jpg", alt: "Times Square at night in New York" },
    ],
  },
];

export default function TravelSection() {
  return (
    <section id="travel" className="relative z-10 px-6 md:px-10 lg:px-16 pb-24 md:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="mx-auto mb-6 flex max-w-[1100px] flex-col items-center text-center md:mb-8"
      >
        <div className="mb-8 h-1 w-12 rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] shadow-[0_0_15px_rgba(137,170,204,0.5)]" />
        <h2 className="mb-6 font-display text-6xl italic tracking-tight text-text-primary md:text-8xl lg:text-9xl">
          Travel!
        </h2>
        <p className="max-w-2xl text-lg text-muted md:text-xl">
          I love traveling across the world.
        </p>
      </motion.div>

      <div className="mx-auto flex w-full max-w-[1100px] flex-col pb-[12vh]">
        {trips.map((trip, index) => (
          <TravelCard
            key={`${trip.place}-${trip.date}`}
            trip={trip}
            index={index}
            totalCards={trips.length}
          />
        ))}
      </div>
    </section>
  );
}

const TravelCard = ({
  trip,
  index,
  totalCards,
}: {
  trip: (typeof trips)[number];
  index: number;
  totalCards: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.02;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const hasImages = Boolean(trip.images?.length);

  return (
    <div
      ref={containerRef}
      className="sticky top-20 flex h-[80svh] items-start justify-center md:top-32 md:h-[76vh]"
      style={{ zIndex: index }}
    >
      <motion.article
        style={{
          scale,
          top: `${index * 18}px`,
        }}
        className={`relative grid h-[min(660px,72svh)] w-full origin-top grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[32px] border border-stroke bg-surface/40 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors duration-500 hover:bg-surface/55 md:h-[min(640px,68vh)] md:grid-rows-none md:rounded-[40px] md:p-7 lg:p-8 ${hasImages ? 'gap-4 md:grid-cols-[0.76fr_1.24fr] md:gap-5' : 'md:grid-cols-1'}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(137,170,204,0.16),transparent_32%),radial-gradient(circle_at_85%_100%,rgba(78,133,191,0.12),transparent_34%)]" />

        <div className="relative z-10 flex min-h-0 flex-col justify-between gap-6 md:gap-8">
          <span className="font-body text-sm font-medium uppercase tracking-[0.35em] text-muted">
            Trip {trip.num}
          </span>

          <div>
            <p className="mb-4 font-body text-sm font-medium uppercase tracking-[0.35em] text-[#89AACC] md:text-base">
              {trip.date}
            </p>
            <h3 className="font-display text-6xl italic leading-none tracking-tight text-text-primary md:text-8xl lg:text-9xl">
              {trip.place}
            </h3>
          </div>

          <p className="max-w-md text-base leading-relaxed text-muted md:text-lg lg:text-xl">
            {trip.note}
          </p>
        </div>

        {hasImages && (
          <div className="relative z-10 grid min-h-0 grid-cols-2 grid-rows-[minmax(0,1.35fr)_minmax(0,1fr)] gap-3 md:grid-cols-[1fr_0.72fr] md:grid-rows-2">
            {trip.images?.map((image, imageIndex) => (
              <div
                key={image.src}
                className={`min-h-0 overflow-hidden rounded-[24px] border border-stroke bg-bg/40 shadow-[0_18px_50px_rgba(0,0,0,0.28)] md:rounded-[30px] ${imageIndex === 0 ? 'col-span-2 md:col-span-1 md:row-span-2 md:h-full' : 'md:h-full'}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        )}
      </motion.article>
    </div>
  );
};
