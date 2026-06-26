import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-4 md:pt-6 px-4 transition-all duration-300">
      <div className={`inline-flex items-center max-w-full rounded-full backdrop-blur-md border border-stroke bg-surface/80 p-1 md:p-1.5 transition-shadow duration-300 ${scrolled ? 'shadow-md shadow-black/20' : ''}`}>
        
        {/* Logo */}
        <Link to="/" className="shrink-0 group relative w-8 h-8 md:w-8 md:h-8 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 ml-1">
          <div className="absolute inset-0 rounded-full accent-gradient transition-transform duration-500 group-hover:rotate-180" />
          <div className="absolute inset-[1.5px] rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[12px] text-text-primary pt-[1px]">AA</span>
          </div>
        </Link>

        <div className="w-px h-4 md:h-5 bg-stroke mx-1 md:mx-2 shrink-0" />

        {/* Nav Links */}
        <div className="flex items-center mx-1 gap-1 overflow-x-auto no-scrollbar mask-edges">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            // Hide Home on mobile to save space
            const mobileHidden = link.name === 'Home' ? 'hidden sm:block' : '';
            return (
              <Link 
                key={link.name} 
                to={link.path}
                className={`${mobileHidden} whitespace-nowrap text-[13px] sm:text-sm rounded-full px-4 py-2 transition-colors font-medium ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#89AACC] to-[#4E85BF] bg-stroke/20 border border-[#89AACC]/20 shadow-[0_0_15px_rgba(137,170,204,0.15)]' : 'text-muted hover:text-text-primary hover:bg-stroke/50 border border-transparent'}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="hidden sm:block w-px h-5 bg-stroke mx-2 shrink-0" />

        {/* Say Hi Button - Hidden on mobile */}
        <Link to="/contact" className="hidden sm:inline-flex group relative rounded-full text-sm px-4 py-1.5 text-text-primary mr-0.5 font-medium shrink-0">
          <span className="absolute inset-[-1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center gap-1.5 bg-surface rounded-full backdrop-blur-md px-4 py-1.5">
            Say hi <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <div className="w-px h-4 md:h-5 bg-stroke mx-1 md:mx-2 shrink-0" />

        {/* Theme toggle - origin of the reveal animation */}
        <ThemeToggle />

      </div>
    </nav>
  );
}
