import { useEffect, useLayoutEffect, useRef } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const byeHandRef = useRef<HTMLDivElement>(null);

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

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const marquee = marqueeRef.current;
    const byeHand = byeHandRef.current;
    if (!section || !marquee || !byeHand) return;

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      gsap.to(marquee, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const wave = gsap.timeline({ paused: true });
        wave
          .set(byeHand, {
            autoAlpha: 0,
            xPercent: -50,
            y: 150,
            rotation: -12,
            scale: 0.85,
            transformOrigin: '65% 75%',
          })
          .to(byeHand, {
            autoAlpha: 1,
            y: -82,
            scale: 1.18,
            duration: 0.62,
            ease: 'back.out(1.6)',
          })
          .to(byeHand, {
            rotation: 18,
            duration: 0.16,
            repeat: 5,
            yoyo: true,
            ease: 'sine.inOut',
          }, '-=0.08')
          .to(byeHand, {
            rotation: 0,
            y: () => -Math.min(window.innerHeight * 0.72, section.offsetHeight * 0.78),
            scale: 1.08,
            duration: 0.72,
            ease: 'power3.inOut',
          });

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: 'bottom bottom',
          onEnter: () => wave.restart(),
          onEnterBack: () => wave.restart(),
          onLeaveBack: () => wave.pause(0),
        });

        return () => {
          trigger.kill();
          wave.kill();
        };
      });

      media.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(byeHand, { autoAlpha: 0 });
      });
    }, section);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative bg-bg pt-24 md:pt-40 pb-8 md:pb-12 overflow-hidden min-h-[80vh] flex flex-col justify-between">
      
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

      <div
        ref={byeHandRef}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 z-20 text-7xl opacity-0 drop-shadow-[0_18px_28px_rgba(0,0,0,0.65)] will-change-transform md:text-8xl"
      >
        👋
      </div>

    </section>
  );
}
