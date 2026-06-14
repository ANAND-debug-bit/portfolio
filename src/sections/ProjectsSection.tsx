import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { LiveProjectButton } from '../components/Buttons';

const projects = [
  {
    num: "01",
    client: "Personal",
    name: "LocalOS",
    description: "An AI operating system built for local businesses, described as \"a second brain for your local business.\" It covers 11 pillars including Teams/HR, Healthcare, Legal, Revenue/Finance, Insurance, Marketing, Reputation, Website, Inventory, Analytics, and an AI Brain. You are building this for a YC F26 application due July 27.",
    images: {
      c1_1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      c1_2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      c2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
    }
  },
  {
    num: "02",
    client: "Hackathon / YC S26",
    name: "Kastral (CashCast)",
    description: "A cash flow forecasting app for local businesses. It uses EWMA baselines, weather multipliers, Ticketmaster event data, day-of-week weighting, and Monte Carlo simulation to predict cash flow. First place at the Microsoft Boston Builders Hackathon.",
    images: {
      c1_1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      c1_2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
      c2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
    }
  },
  {
    num: "03",
    client: "Personal",
    name: "Om Daily",
    description: "A gamified Hindu learning app with a 3D globe navigation system and interactive block-based curriculum. Built in React Native with Expo and Supabase. Includes a Dharma Coins loyalty and gamification system.",
    images: {
      c1_1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      c1_2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
      c2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
    }
  },
  {
    num: "04",
    client: "Personal",
    name: "Om Apparels",
    description: "A streetwear clothing brand connected to Dharma Daily through the Dharma Coins loyalty system. It references Fear of God Essentials construction standards and is rooted in Hindu and Jain philosophy.",
    images: {
      c1_1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      c1_2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      c2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
    }
  },
  {
    num: "05",
    client: "Personal",
    name: "Day Trading Quiz App",
    description: "A concept app described as \"Duolingo for day trading.\" Built to teach day trading concepts in a gamified, lesson-based format.",
    images: {
      c1_1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      c1_2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
      c2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
    }
  },
  {
    num: "06",
    client: "Personal",
    name: "ClawStreet.io",
    description: "An AI trading agents concept explored, focused on automated stock trading.",
    images: {
      c1_1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      c1_2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
      c2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
    }
  },
  {
    num: "07",
    client: "Personal",
    name: "Slack Daily Market Recap",
    description: "A daily automated stock market summary posted to your Slack channel called #stocks-daily-recap.",
    images: {
      c1_1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      c1_2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      c2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
    }
  },
  {
    num: "08",
    client: "Competition",
    name: "Jains in Action 2026",
    description: "A business pitch competition with real investors that you are participating in, tied to your Jain background.",
    images: {
      c1_1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      c1_2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
      c2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
    }
  },
  {
    num: "09",
    client: "Personal",
    name: "Investment Club",
    description: "A project centered around organizing and running a student investment club.",
    images: {
      c1_1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      c1_2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
      c2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
    }
  }
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-30 relative px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn delay={0} y={40} className="mb-16 sm:mb-20 md:mb-24">
        <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none">
          Project
        </h2>
      </FadeIn>

      <div className="flex flex-col relative w-full max-w-6xl mx-auto pb-[10vh]">
        {projects.map((project, i) => (
          <ProjectCard 
            key={project.num} 
            project={project} 
            index={i} 
            totalCards={projects.length} 
          />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index, totalCards }: { project: any, index: number, totalCards: number }) => {
  const containerRef = useRef(null);
  
  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  //   offset: ['start end', 'start start']
  // });

  const { scrollYProgress: scrollYProgressLeave } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Calculate scaling so that earlier cards scale down as later cards stack on top
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  
  // Transform scale based on scroll position of leaving the sticky area
  const scale = useTransform(scrollYProgressLeave, [0, 1], [1, targetScale]);

  return (
    <div ref={containerRef} className="h-[85vh] flex items-start justify-center sticky top-24 md:top-32" style={{ zIndex: index }}>
      <motion.div 
        style={{ 
          scale,
          top: `calc(10vh + ${index * 28}px)` // slight offset for visual stacking
        }}
        className="w-full h-full max-h-[800px] border-2 border-[#D7E2EA] bg-[#0C0C0C] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] p-4 sm:p-6 md:p-8 flex flex-col gap-6 sm:gap-8 origin-top shadow-[0_-10px_30px_rgba(0,0,0,0.5)] relative"
      >
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-[#D7E2EA] font-black text-[clamp(2.5rem,6vw,80px)] leading-none">{project.num}</span>
            <div className="flex flex-col">
              <span className="text-[#D7E2EA]/60 uppercase text-xs sm:text-sm tracking-wider font-light">{project.client}</span>
              <span className="text-[#D7E2EA] font-medium uppercase text-lg sm:text-xl md:text-2xl">{project.name}</span>
              {project.description && (
                <span className="text-[#D7E2EA]/80 text-sm sm:text-base mt-1 max-w-2xl">{project.description}</span>
              )}
            </div>
          </div>
          <LiveProjectButton />
        </div>

        {/* Bottom Row - Image Grid */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-1 min-h-0">
          <div className="w-full sm:w-[40%] flex flex-col gap-4 sm:gap-6 h-full">
            <div className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden" style={{ height: 'clamp(130px, 16vw, 230px)' }}>
              <img src={project.images.c1_1} alt="Project Detail" className="w-full h-full object-cover" />
            </div>
            <div className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden flex-1" style={{ height: 'clamp(160px, 22vw, 340px)' }}>
              <img src={project.images.c1_2} alt="Project Detail" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="w-full sm:w-[60%] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden h-full">
            <img src={project.images.c2} alt="Project Main" className="w-full h-full object-cover" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
