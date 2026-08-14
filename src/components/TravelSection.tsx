import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const trips = [
  {
    num: "01",
    place: "Ayodhya",
    note: "Sacred temples, riverside ghats, and quiet devotion.",
    images: [
      { src: "/travel/ayodhya/ay1.png", alt: "Ram Mandir temple in Ayodhya" },
      { src: "/travel/ayodhya/ay2.png", alt: "Saryu river ghats in Ayodhya" },
      { src: "/travel/ayodhya/ay3.png", alt: "Temple street scene in Ayodhya" },
    ],
  },
  {
    num: "02",
    place: "Dehradun",
    note: "Hill air, valley views, and a slower pace...",
    images: [
      { src: "/travel/ayodhya/de1.png", alt: "Valley view near Dehradun" },
      { src: "/travel/ayodhya/de2.png", alt: "Forest road in Dehradun" },
      { src: "/travel/ayodhya/de3.png", alt: "Hillside town view in Dehradun" },
    ],
  },
  {
    num: "03",
    place: "Rajasthan",
    note: "Forts, desert light, and centuries of color.",
    images: [
      { src: "/travel/rajasthan/ra1.png", alt: "Fort overlooking Rajasthan" },
      { src: "/travel/rajasthan/ra2.png", alt: "Desert dunes in Rajasthan" },
      { src: "/travel/rajasthan/ra3.png", alt: "Palace courtyard in Rajasthan" },
    ],
  },
  {
    num: "04",
    place: "Jammu and Kashmir",
    note: "Snow peaks, still lakes, and mountain calm.",
    images: [
      { src: "/travel/jammu-kashmir/jk1.png", alt: "Snow-capped mountains in Jammu and Kashmir" },
      { src: "/travel/jammu-kashmir/jk2.png", alt: "Shikara boat on a lake in Kashmir" },
      { src: "/travel/jammu-kashmir/jk3.png", alt: "Valley meadow in Jammu and Kashmir" },
    ],
  },
  {
    num: "05",
    place: "Agra",
    note: "Marble domes, morning mist, and timeless history.",
    images: [
      { src: "/travel/agra/ag1.png", alt: "Taj Mahal at sunrise in Agra" },
      { src: "/travel/agra/ag2.png", alt: "Agra Fort exterior" },
      { src: "/travel/agra/ag3.png", alt: "Marble details at a monument in Agra" },
    ],
  },
  {
    num: "06",
    place: "Jabalpur (MP)",
    note: "Marble rocks, river gorges, and quiet nature.",
    images: [
      { src: "/travel/jabalpur/ja1.png", alt: "Marble rocks along the river in Jabalpur" },
      { src: "/travel/jabalpur/ja2.png", alt: "Dhuandhar waterfall in Jabalpur" },
      { src: "/travel/jabalpur/ja3.png", alt: "Boat ride through the gorge in Jabalpur" },
    ],
  },
  {
    num: "07",
    place: "Nainital",
    note: "Ancient ruins, riverside towns, and deep roots.",
    images: [
      { src: "/travel/nainital/na1.png", alt: "Ancient ruins in Nainital" },
      { src: "/travel/nainital/na2.png", alt: "Riverside town scene in Nainital" },
      { src: "/travel/nainital/na3.png", alt: "Temple complex in Nainital" },
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
        <h2 className="font-display text-6xl italic tracking-tight text-text-primary md:text-8xl lg:text-9xl">
          Travel!
        </h2>
      </motion.div>

      <div className="mx-auto flex w-full max-w-[1100px] flex-col pb-[12vh]">
        {trips.map((trip, index) => (
          <TravelCard
            key={`${trip.place}-${trip.num}`}
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