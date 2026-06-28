import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { ThemeProvider } from './context/ThemeProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import ContactPage from './pages/Contact';

// ScrollToTop component to reset scroll on route change. Lenis hijacks the
// scroll position, so a plain window.scrollTo(0,0) gets ignored — we reset
// the Lenis instance directly (and fall back to the window for safety).
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    const refreshId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => window.cancelAnimationFrame(refreshId);
  }, [pathname]);
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    } as any);

    // Drive Lenis from GSAP's ticker and push every Lenis scroll into
    // ScrollTrigger. Without this the smooth-scroll position and ScrollTrigger
    // run on separate clocks, so pinned/scrubbed sections drift and keep
    // gliding after you stop scrolling.
    lenis.on('scroll', ScrollTrigger.update);
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Expose so route changes can reset the scroll position (see ScrollToTop).
    (window as any).__lenis = lenis;

    return () => {
      gsap.ticker.remove(onTick);
      lenis.off('scroll', ScrollTrigger.update);
      (window as any).__lenis = null;
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-bg min-h-screen text-text-primary selection:bg-text-primary selection:text-bg overflow-x-clip flex flex-col">
      <Navbar />
      <main className="relative w-full flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoadingComplete = useCallback(() => setIsLoading(false), []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
        <Layout>
          <Routes>
            <Route path="/" element={<Home isLoading={isLoading} />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
