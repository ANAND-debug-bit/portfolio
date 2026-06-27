import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle Video
    const video = videoRef.current;
    if (!video) return;

    const videoSrc = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls({ startLevel: -1, maxBufferLength: 30 });
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.log("Autoplay prevented:", e));
      });
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(e => console.log("Autoplay prevented:", e));
      });
    }
  }, []);

  useEffect(() => {
    if (!marqueeRef.current) return;
    
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1
    });
  }, []);

  return (
    <section id="contact" className="relative bg-bg pt-24 md:pt-40 pb-8 md:pb-12 overflow-hidden min-h-[80vh] flex flex-col justify-between">
      
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-bg to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 mb-20 text-center">
        
        {/* Sits over the dark video — kept white in both themes. */}
        <h2 className="text-5xl md:text-8xl lg:text-9xl font-display italic text-white mb-8">
          Let's collaborate.
        </h2>

        <a 
          href="mailto:aahish.abbani@icloud.com"
          className="group relative inline-flex rounded-full text-base md:text-lg px-8 py-4 bg-surface text-text-primary transition-all duration-300 hover:scale-105"
        >
          <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          <span className="absolute inset-[2px] bg-bg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          <div className="relative z-10 flex items-center gap-2 font-medium">
            aahish.abbani@icloud.com <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </a>

      </div>

      {/* Marquee Banner */}
      <div className="relative z-10 w-full overflow-hidden mb-16 md:mb-24 flex items-center bg-text-primary/5 py-4 border-y border-stroke/50 backdrop-blur-md">
        <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
          {/* Double the content to allow for seamless looping to -50% */}
          <div className="flex shrink-0">
            {Array(10).fill("BUILDING THE FUTURE • ").map((text, i) => (
              <span key={i} className="text-4xl md:text-6xl lg:text-7xl font-display text-white/40 mx-4">
                {text}
              </span>
            ))}
          </div>
          <div className="flex shrink-0">
            {Array(10).fill("BUILDING THE FUTURE • ").map((text, i) => (
              <span key={`dup-${i}`} className="text-4xl md:text-6xl lg:text-7xl font-display text-white/40 mx-4">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
