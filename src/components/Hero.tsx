import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';

const roles = ["Student", "Developer", "Founder"];

export default function Hero({ isLoading }: { isLoading: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    // Handle Video
    const video = videoRef.current;
    if (!video) return;

    const videoSrc = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls({
        startLevel: -1, // Auto
        maxBufferLength: 30,
      });
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.log("Autoplay prevented:", e));
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS (Safari)
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(e => console.log("Autoplay prevented:", e));
      });
    }
  }, []);

  useEffect(() => {
    // Handle Role Cycling
    const roleInterval = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(roleInterval);
  }, []);

  useEffect(() => {
    // GSAP Entrance (Run when loading is complete)
    if (!isLoading) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".name-reveal", 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1.2 }, 
        0.1
      );

      tl.fromTo(".blur-in",
        { opacity: 0, y: 20, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.1 },
        0.3
      );
    }
  }, [isLoading]);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-bg">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
        
        {/* Sits over the dark hero image — kept white in both themes. */}
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-white mb-6 opacity-0">
          Aahish Abbani
        </h1>

        <div className="blur-in text-lg md:text-2xl lg:text-3xl font-body text-white/70 mb-12 opacity-0">
          A{' '}
          <span key={roleIndex} className="font-display italic text-white animate-role-fade-in inline-block px-1">
            {roles[roleIndex]}
          </span>
          {' '}who lives in Massachusetts.
        </div>



      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="text-[10px] text-muted uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-10 bg-stroke overflow-hidden relative">
          <div className="w-full h-full accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
