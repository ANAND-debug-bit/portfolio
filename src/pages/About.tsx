import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import MagneticCard from '../components/MagneticCard';
import TravelSection from '../components/TravelSection';

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

const events = [
  {
    year: "2010",
    title: "The Beginning",
    description: "Born December 3rd, 2010. The start of an incredible journey.",
  },
  {
    year: "2010 - 2017",
    title: "Early Years",
    description: "Lived in Quincy, MA. Started developing an early curiosity for how things work.",
  },
  {
    year: "2017",
    title: "New Horizons",
    description: "Moved to Shrewsbury, Massachusetts in January of 2017. A new environment sparked new interests.",
  },
  {
    year: "2020",
    title: "First Lines of Code",
    description: "Started learning the basics of programming and web development. Built first personal projects and discovered a passion for building.",
  },
  {
    year: "2023",
    title: "Building the Future",
    description: "Started taking development seriously. Focused on design systems, modern web frameworks, and creating beautiful digital experiences.",
  }
];

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
          <p className="text-muted text-lg md:text-xl max-w-2xl">
            A brief history of my journey, from the beginning to where I am today. 
            Designing, building, and constantly learning.
          </p>
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
            {events.map((event, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`relative flex items-center md:justify-between w-full ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                  
                  {/* Empty space for the other side on desktop */}
                  <div className="hidden md:block w-[47%]" />

                  {/* Center Node mathematically synced with center of screen */}
                  <TimelineNode />

                  {/* Content Card - Wide and Balanced */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="w-full ml-20 md:ml-0 md:w-[47%]"
                  >
                    <MagneticCard className={`group p-8 md:p-10 bg-surface/30 backdrop-blur-xl border border-stroke rounded-3xl transition-colors duration-500 hover:bg-surface/50 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                      <span className="inline-block px-4 py-1.5 bg-surface/50 border border-stroke text-text-primary text-xs md:text-sm font-medium rounded-full mb-5">
                        {event.year}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-display italic text-text-primary mb-3">
                        {event.title}
                      </h3>
                      <p className="text-muted text-base md:text-lg leading-relaxed">
                        {event.description}
                      </p>
                    </MagneticCard>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
      
      <TravelSection />
    </div>
  );
}
