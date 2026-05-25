import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';

function App() {
  return (
    <div className="main-wrapper overflow-x-clip bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-sans selection:bg-[#D7E2EA] selection:text-[#0C0C0C]">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      
      {/* Footer / Contact Section Spacer for smooth scrolling experience */}
      <section id="contact" className="h-[50vh] bg-[#0C0C0C] flex items-center justify-center">
        <h2 className="hero-heading font-black uppercase text-center text-[clamp(2rem,8vw,100px)]">
          Let's Talk
        </h2>
      </section>
    </div>
  );
}

export default App;
