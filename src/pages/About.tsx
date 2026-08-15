import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { InfiniteSlider } from '../components/core/infinite-slider';
import MagneticCard from '../components/MagneticCard';
import TravelSection from '../components/TravelSection';

const ABOUT_INTRO_TEXT =
  "Hey, I'm Atharv Anand, a first-year B.Tech student at Delhi Technological University. I'm a Hack Club member, and I like building things — from web tools like this one to exploring AI, DSA, CP and machine learning. When I'm not coding, you'll find me listening to music or networking.";

function AnimatedIntroCharacter({
  char,
  index,
  progress,
  total,
}: {
  char: string;
  index: number;
  progress: MotionValue<number>;
  total: number;
}) {
  const start = index / total;
  const end = Math.min(1, start + 0.16);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <motion.span aria-hidden="true" style={{ opacity }}>
      {char}
    </motion.span>
  );
}

function AnimatedIntroText() {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  return (
    <div className="about-intro-edge-glow relative isolate mt-10 w-full max-w-[640px] rounded-3xl border border-stroke bg-surface/30 px-6 py-7 shadow-[0_18px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-8 sm:py-8 md:px-10 md:py-9">
      <p
        ref={textRef}
        aria-label={ABOUT_INTRO_TEXT}
        className="mx-auto max-w-[560px] whitespace-pre-wrap text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]"
      >
        {ABOUT_INTRO_TEXT.split('').map((char, index) => (
          <AnimatedIntroCharacter
            key={`${char}-${index}`}
            char={char}
            index={index}
            progress={scrollYProgress}
            total={ABOUT_INTRO_TEXT.length}
          />
        ))}
      </p>
    </div>
  );
}

type TimelineEventData = {
  year: string;
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
    position?: string;
    fit?: "cover" | "contain";
    aspect?: "wide" | "square";
    callout?: {
      text: string;
    };
  };
  sideAccent?: "car";
};

function TimelineNode() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <div ref={ref} className="absolute left-[35px] md:left-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-surface border-[3px] md:border-4 border-stroke -translate-x-1/2 z-10 flex items-center justify-center shadow-lg">
      <motion.div 
        className="w-full h-full rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF]"
        style={{ opacity, scale }}
      />
    </div>
  );
}

function TimelineImage({ image }: { image: NonNullable<TimelineEventData['image']> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 50%"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  const opacity = useTransform(p, [0, 0.55], [0, 1]);
  const y = useTransform(p, [0, 1], [34, 0]);
  const scale = useTransform(p, [0, 1], [0.97, 1]);
  const filter = useTransform(p, [0, 1], ["blur(10px)", "blur(0px)"]);
  const sheenX = useTransform(p, [0, 1], ["-120%", "120%"]);
  const sheenOpacity = useTransform(p, [0, 0.35, 0.8, 1], [0, 0.18, 0.1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale, filter }}
      className={`relative mb-7 w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)] will-change-transform ${image.aspect === "square" ? "aspect-square" : "aspect-[4/3]"}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        style={{ objectPosition: image.position ?? "center" }}
        className={`h-full w-full ${image.fit === "contain" ? "object-contain bg-black" : "object-cover"}`}
      />
      {image.callout ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.72 }}
        >
          <motion.svg
            aria-hidden="true"
            viewBox="0 0 100 75"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            <motion.path
              d="M 21 18 C 18 25, 22 31, 33 35"
              fill="none"
              stroke="#F8FAFC"
              strokeWidth="2.35"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                show: { pathLength: 1, opacity: 1 },
              }}
              transition={{ duration: 0.7, delay: 0.32, ease: "easeOut" }}
            />
            <motion.path
              d="M 33 35 L 27.8 33.7 M 33 35 L 30.2 30.4"
              fill="none"
              stroke="#F8FAFC"
              strokeWidth="2.35"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                show: { pathLength: 1, opacity: 1 },
              }}
              transition={{ duration: 0.28, delay: 0.95, ease: "easeOut" }}
            />
          </motion.svg>

          <motion.div
            className="absolute left-[5%] top-[6%] max-w-[56%]"
            variants={{
              hidden: { opacity: 0, y: 12, scale: 0.82, rotate: -4 },
              show: { opacity: 1, y: 0, scale: 1, rotate: -2 },
            }}
            transition={{ type: "spring", stiffness: 420, damping: 18, delay: 0.12 }}
          >
            <motion.div
              animate={{ y: [0, -4, 0], rotate: [-2, 1, -2] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-full border border-white/35 bg-[#4E85BF]/68 px-3.5 py-2 text-[clamp(0.72rem,2.8vw,0.92rem)] font-semibold leading-none text-white shadow-[0_12px_32px_rgba(0,0,0,0.45)] backdrop-blur-md sm:px-4 sm:py-2.5"
            >
              {image.callout.text}
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
      <motion.div
        aria-hidden="true"
        style={{ x: sheenX, opacity: sheenOpacity }}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
    </motion.div>
  );
}

function TimelineEvent({ event, index }: { event: TimelineEventData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 85%", "end 35%"],
  });
  const carProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  });

  const carLeft = useTransform(carProgress, (value) => `${6 + value * 76}%`);
  const carOpacity = useTransform(carProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);
  const carY = useTransform(carProgress, [0, 0.5, 1], [1, -2, 1]);

  return (
    <div
      className={`relative flex items-center md:justify-between w-full ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}
    >
      {/* Empty space for the other side on desktop */}
      <div className="hidden md:block w-[47%]" />

      {/* Center Node mathematically synced with center of screen */}
      <TimelineNode />

      {/* Content Card - Wide and Balanced */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full ml-20 md:ml-0 md:w-[47%]"
      >
        <MagneticCard className={`group p-8 md:p-10 bg-surface/30 backdrop-blur-xl border border-stroke rounded-3xl transition-colors duration-500 hover:bg-surface/50 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
          {event.image ? <TimelineImage image={event.image} /> : null}

          <span className="inline-block px-4 py-1.5 bg-surface/50 border border-stroke text-text-primary text-xs md:text-sm font-medium rounded-full mb-5">
            {event.year}
          </span>
          <h3 className="text-3xl md:text-4xl font-display italic text-text-primary mb-3">
            {event.title}
          </h3>
          <p className="text-muted text-base md:text-lg leading-relaxed">
            {event.description}
          </p>

          {event.sideAccent === "car" ? (
            <div aria-hidden="true" className="pointer-events-none relative mt-7 h-9 w-full overflow-hidden">
              <motion.svg
                viewBox="0 0 96 48"
                style={{ left: carLeft, opacity: carOpacity, y: carY, x: "-50%" }}
                className="absolute bottom-0 h-8 w-16 text-[#4E85BF] drop-shadow-[0_8px_14px_rgba(78,133,191,0.35)] md:h-9 md:w-[72px]"
                fill="currentColor"
              >
                <path d="M22 28.5 29.2 16c1.6-2.8 4.3-4.5 7.4-4.5h22.2c3.2 0 5.9 1.7 7.5 4.5l7.2 12.5h6.1c3.6 0 6.4 2.9 6.4 6.4v3.6c0 1.6-1.3 2.9-2.9 2.9h-6.3a8.7 8.7 0 0 0-17.2 0H36.4a8.7 8.7 0 0 0-17.2 0h-6.3a2.9 2.9 0 0 1-2.9-2.9v-3.6c0-3.6 2.9-6.4 6.4-6.4H22Zm13.2-11.2-5.9 11.2h15.1V17.3h-9.2Zm15.4 0v11.2h17.1l-6-10.4c-.4-.5-1.1-.8-2-.8h-9.1Z" />
                <circle cx="27.8" cy="41.4" r="5.8" fill="var(--bg)" />
                <circle cx="27.8" cy="41.4" r="3" />
                <circle cx="68.2" cy="41.4" r="5.8" fill="var(--bg)" />
                <circle cx="68.2" cy="41.4" r="3" />
              </motion.svg>
            </div>
          ) : null}
        </MagneticCard>
      </motion.div>
    </div>
  );
}

const events: TimelineEventData[] = [
  {
    year: "2009",
    title: "The Beginning",
    description: "I was born June 23rd, 2009, in New Delhi, India.",
    image: {
      src: "/about/marquee/birth.jpeg",
      alt: "Newborn photo of Atharv",
    },
  },
  {
    year: "2009 - 2016",
    title: "Primary Years",
    description: "Spent my early years studying primary education in Sagarpur, New Delhi, building the foundation of my learning and school life.",
    image: {
      src: "/about/early-years.jpeg",
      alt: "Primary school years in Sagarpur, New Delhi",
      position: "center 30%",
      aspect: "square",
    },
  },
  {
    year: "2018",
    title: "Life Achievements",
    description: "One of the best moments of my life — a milestone that accelerated my academics to the next level from the very beginning.",
    image: {
      src: "/about/life-achievement-2018.jpg",
      alt: "Life achievement moment in 2018",
      position: "center 25%",
      aspect: "square",
    },
  },

  {
    year: "2024",
    title: "Got Into Coding , electronics and robotics",
    description: "Got into the world of engineering with basic Python, built a IOT project named 'IOT infused Urban Farming Ecosystem' with Arduino , ESP32 and sensors . also won our first Science exhibition followed by a series of victories and challenges.",
    image: {
      src: "/about/marquee/IOT.jpg",
      alt: "Sphero robot ball used while learning block programming",
    },
  },
  {
  year: "2024",
  title: "Selected for ISRO Yuvika",
  description: "Got selected for ISRO Yuvika, India's largest residential program at one of the Space Centers of India, among lakhs of applicants across the country.",
    image: {
      src: "/about/marquee/isro.jpg",
    alt: "Selected for ISRO Yuvika student residential program",
  },
  },
  {
    year: "May 2024",
    title: "My Family and I",
    description: "My family and I at my Orientation day at ISRO space center in Dehradun, Uttarakhand, India.",
      image: {
      src: "/about/marquee/family.jpg",
      alt: "Family photo at ISRO orientation day",
      callout: {
        text: "That's my family!",
      },
    },
  },
  
  {
    year: "July 2026",
    title: "Published My First Site",
description: "Built and deployed PhysLab, an interactive physics simulation site to help visualize and understand core physics concepts and experiments.",
    image: {
      src: "/about/marquee/phys.jpg",
      alt: "PhysLab site icon",
      aspect: "wide",
      fit: "contain",
    },
  },
  {
    year: "Aug 2026",
    title: "New Chapter",
    description: "Got into Delhi Technological University — starting my journey of engineering.",
    image: {
      src: "/about/marquee/delhi.jpg",
      alt: "DTU campus photo",
      aspect: "wide",
      fit: "cover",
    },
  },
  {
    year: "Current",
    title: "Building Projects , working on AI skills , relations and making memories", 
    description: "I enjoy building projects, experimenting with new ideas, learning more about AI and talking to new people.",
  }
];

const marqueePhotos = [
  {
    src: "/about/marquee/marquee-01.jpeg",
    alt: "Campus event portrait",
  },
  {
    src: "/about/marquee/marquee-02.jpg",
    alt: "Train ride with friends",
  },
  {
    src: "/about/marquee/marquee-03.jpg",
    alt: "Observing through a telescope",
  },
  {
    src: "/about/marquee/marquee-04.jpg",
    alt: "Group event photo",
  },
  {
    src: "/about/marquee/marquee-05.jpg",
    alt: "Class trip group at dinner",
  },
  {
    src: "/about/marquee/marquee-06.jpg",
    alt: "Space exhibit with friends",
  },
  {
    src: "/about/marquee/marquee-07.jpg",
    alt: "Swimming pool team photo",
  },
  {
    src: "/about/marquee/marquee-08.jpg",
    alt: "Stage performance group picture",
  },
  {
    src: "/about/marquee/marquee-09.jpg",
    alt: "Group celebration photo",
  },
  {
    src: "/about/marquee/marquee-10.jpg",
    alt: "Friends posing after an event",
  },
  {
    src: "/about/marquee/d1.jpg",
    alt: "New marquee photo",
  },
  {
    src: "/about/marquee/d2.jpg",
    alt: "Marquee photo d2",
  },
  {
    src: "/about/marquee/d3.jpg",
    alt: "Marquee photo d3",
  },
  {
    src: "/about/marquee/d4.jpg",
    alt: "Marquee photo d4",
  },
  {
    src: "/about/marquee/d5.jpg",
    alt: "Marquee photo d5",
  },
  {
    src: "/about/marquee/d6.jpg",
    alt: "Marquee photo d6",
  },
  {
    src: "/about/marquee/d7.JPG",
    alt: "Marquee photo d7",
  },
  {
    src: "/about/marquee/d8.JPG",
    alt: "Marquee photo d8",
  },
  {
    src: "/about/marquee/d9.jpg",
    alt: "Marquee photo d9",
  },
  {
    src: "/about/marquee/d10.JPG",
    alt: "Marquee photo d10",
  },
  {
    src: "/about/marquee/d11.JPG",
    alt: "Marquee photo d11",
  },
  {
    src: "/about/marquee/d12.JPG",
    alt: "Marquee photo d12",
  },
  {
    src: "/about/marquee/d13.jpg",
    alt: "Marquee photo d13",
  },
  {
    src: "/about/marquee/d14.jpg",
    alt: "Marquee photo d14",
  },
  {
    src: "/about/marquee/d15.jpg",
    alt: "Marquee photo d15",
  },
];

function MemoryMarquee() {
  return (
    <section className="relative z-10 -mt-10 mb-24 overflow-hidden border-y border-stroke/70 bg-surface/20 py-8 backdrop-blur-xl md:-mt-16 md:mb-32 md:py-10">
      <InfiniteSlider speed={42} speedOnHover={20} gap={24}>
        {marqueePhotos.map((photo) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            className="aspect-square w-[118px] rounded-md border border-white/10 object-cover shadow-[0_18px_50px_rgba(0,0,0,0.32)] md:w-[148px]"
            draggable={false}
          />
        ))}
      </InfiniteSlider>
    </section>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heightPercentage = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="bg-bg min-h-screen pt-32 pb-[50vh] relative overflow-x-clip">
      
      {/* Background radial gradient for sick aesthetic */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3" />

      <div className="max-w-[1100px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24 md:mb-40 text-center flex flex-col items-center"
        >
          <div className="w-12 h-1 bg-gradient-to-r from-[#89AACC] to-[#4E85BF] rounded-full mb-8 shadow-[0_0_15px_rgba(137,170,204,0.5)]" />
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display italic tracking-tight text-text-primary mb-6">
            About Me
          </h1>
          <AnimatedIntroText />
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-[1200px] mx-auto pb-32">
          
          {/* Background Grey Line - Balanced Thickness */}
          <div className="absolute left-[35px] md:left-1/2 top-0 bottom-0 w-2 md:w-3 bg-stroke rounded-full -translate-x-1/2" />

          {/* Animated Blue Gradient Line - Balanced Thickness */}
          <motion.div 
            className="absolute left-[35px] md:left-1/2 top-0 w-2 md:w-3 rounded-full -translate-x-1/2 bg-gradient-to-b from-[#89AACC] to-[#4E85BF] shadow-[0_0_15px_rgba(137,170,204,0.4)]"
            style={{ height: heightPercentage }}
          />

          {/* Timeline Events */}
          <div className="flex flex-col gap-20 md:gap-32">
            {events.map((event, index) => (
              <TimelineEvent key={`${event.year}-${event.title}`} event={event} index={index} />
            ))}
          </div>

        </div>

      </div>

      <MemoryMarquee />
      
      <TravelSection />
    </div>
  );
}
