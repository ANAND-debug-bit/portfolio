import { useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { ThemeProvider } from './context/ThemeProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import Seo from './components/Seo';

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

function Layout({ children, isLoading }: { children: React.ReactNode; isLoading: boolean }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pathnameRef = useRef(pathname);
  const isLoadingRef = useRef(isLoading);
  const navigateRef = useRef(navigate);
  pathnameRef.current = pathname;
  isLoadingRef.current = isLoading;
  navigateRef.current = navigate;

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

    // Home only: arriving at the bottom by scrolling down opens About.
    // Reads the latest route through refs so this does not rebuild Lenis.
    let switched = false;
    let movingDown = false;
    const onReachEnd = (instance: { scroll: number; limit: number; direction: number }) => {
      if (pathnameRef.current !== '/' || isLoadingRef.current) {
        switched = false;
        movingDown = false;
        return;
      }
      if (switched) return;
      if (instance.direction === 1) movingDown = true;
      else if (instance.direction === -1) movingDown = false;
      if (!movingDown) return;
      if (instance.limit < 32) return;
      if (instance.scroll < instance.limit - 2) return;
      switched = true;
      navigateRef.current('/about');
    };
    lenis.on('scroll', onReachEnd);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Expose so route changes can reset the scroll position (see ScrollToTop).
    (window as any).__lenis = lenis;

    return () => {
      gsap.ticker.remove(onTick);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.off('scroll', onReachEnd);
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
        <Seo />
        <ScrollToTop />
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
        <Layout isLoading={isLoading}>
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
