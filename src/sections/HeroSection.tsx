import { FadeIn } from '../components/FadeIn';
import { ContactButton } from '../components/Buttons';
import { MouseFollow } from '../components/MouseFollow';

export const HeroSection = () => {
  return (
    <section className="h-screen flex flex-col overflow-x-clip relative">
      <FadeIn delay={0} y={-20} as="nav" className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 w-full z-20">
        {['About', 'Price', 'Projects', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">
            {item}
          </a>
        ))}
      </FadeIn>

      <div className="flex-1 flex flex-col justify-start overflow-hidden z-20 pt-4 sm:pt-6 md:pt-8 px-4">
        <FadeIn delay={0.15} y={40} className="w-full">
          <h1 className="hero-heading font-black uppercase tracking-tighter leading-none whitespace-nowrap w-full text-[6.5vw] sm:text-[7vw] md:text-[7.5vw] lg:text-[8.5vw] text-center">
            HI im aahish Abbani
          </h1>
        </FadeIn>
      </div>

      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 z-20 w-full">
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.5rem)] max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>
        
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* Moved z-index to 30 to overlap text (z-20) and adjusted top position to block text slightly with hair */}
      <FadeIn delay={0.6} y={30} className="absolute left-1/2 -translate-x-1/2 z-30 top-[16%] sm:top-[18%] md:top-[20%] pointer-events-none w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]">
        <MouseFollow className="pointer-events-auto">
          <img 
            src="/aahishabbani.png" 
            alt="Aahish Abbani - 3D Creator" 
            className="w-full h-auto object-contain"
          />
        </MouseFollow>
      </FadeIn>
    </section>
  );
};
