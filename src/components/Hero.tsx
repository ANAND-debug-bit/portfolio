import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { MousePointer2 } from 'lucide-react';

const roles = ["Student", "Developer", "Founder"];

export default function Hero({ isLoading }: { isLoading: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const greetingTextRef = useRef<HTMLSpanElement>(null);
  const handRef = useRef<HTMLSpanElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
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

  useLayoutEffect(() => {
    // GSAP Entrance (Run when loading is complete)
    if (isLoading) return;

    const greeting = greetingRef.current;
    const hand = handRef.current;
    const section = sectionRef.current;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const greetingText = greetingTextRef.current;

    // Final resting state for the name + tagline (used to reveal them).
    const revealName = (tl: gsap.core.Timeline, position: gsap.Position) => {
      tl.fromTo(".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2 },
        position
      );
      tl.fromTo(".blur-in",
        { opacity: 0, y: 20, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.1 },
        "<"
      );
    };

    if (reduceMotion || !greeting) {
      // No greeting sequence / no spin — just show the name and tagline.
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      revealName(tl, 0.1);
      if (greeting) gsap.set(greeting, { autoAlpha: 0 });
      return () => { tl.kill(); };
    }

    const firstName = firstNameRef.current;
    const cursor = cursorRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Measure final resting positions up front, before any fromTo tweens apply
      // their (immediate-render) "from" states. All in viewport coords.
      const center = (el: Element) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      };
      const s = section!.getBoundingClientRect();
      const blackHole = { x: s.left + s.width / 2, y: s.top + s.height * 0.05 };
      const handCenter = hand ? center(hand) : null;
      const nameCenter = firstName ? center(firstName) : null;

      // Converging-vortex suck: a spiral whose radius funnels to a point — wide at
      // the start, gone at the black hole. Added to the timeline as a proxy tween
      // so it sequences cleanly. Returns the travel delta for later restore.
      const addVortex = (
        el: Element,
        startCenter: { x: number; y: number },
        duration: number,
        position: gsap.Position,
      ) => {
        const dx = blackHole.x - startCenter.x;
        const dy = blackHole.y - startCenter.y;
        const R0 = 90;       // widest spiral radius
        const turns = 2.75;  // whips around on the way in
        const proxy = { p: 0 };
        tl.to(proxy, {
          p: 1,
          duration,
          ease: "power2.in",
          onStart: () => gsap.set(el, { transformOrigin: "50% 50%" }),
          onUpdate: () => {
            const p = proxy.p;
            const startup = Math.min(1, p / 0.15);
            const radius = R0 * (1 - p) * startup;
            const angle = p * turns * Math.PI * 2;
            gsap.set(el, {
              x: dx * p + Math.cos(angle) * radius,
              y: dy * p + Math.sin(angle) * radius * 0.4,
              rotation: angle * (180 / Math.PI),
              scale: 1 - p,
              opacity: p < 0.78 ? 1 : Math.max(0, 1 - (p - 0.78) / 0.22),
            });
          },
        }, position);
        return { dx, dy };
      };

      // The wrapper stays visible; its children fade in one at a time below.
      gsap.set(greeting, { opacity: 1, transformOrigin: "50% 50%" });
      gsap.set([hand, greetingText].filter(Boolean), { opacity: 0 });

      // 1. The 👋 fades in first, alone, then waves "hi".
      if (hand) {
        gsap.set(hand, { transformOrigin: "70% 80%" });
        tl.fromTo(hand,
          { opacity: 0, y: 18, filter: "blur(10px)", rotation: -12 },
          { opacity: 1, y: 0, filter: "blur(0px)", rotation: -12, duration: 0.45 },
          0.1
        );
        tl.to(hand,
          { rotation: 18, duration: 0.13, repeat: 2, yoyo: true, ease: "sine.inOut" },
          ">-0.05"
        );
        tl.to(hand, { rotation: 0, duration: 0.1 });
      }

      // 2. Then "Hey, I'm" fades in below the hand.
      if (greetingText) {
        tl.fromTo(greetingText,
          { opacity: 0, y: 14, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4 },
          ">-0.05"
        );
      }

      // 3. Then the name + tagline reveal together.
      revealName(tl, ">");

      // 4. Once everything has landed, the 👋 gets sucked up into the black hole
      // at the very top-center. "Hey, I'm Aahish Abbani" stays put (for now).
      if (hand && handCenter) {
        addVortex(hand, handCenter, 0.65, "-=0.1");
      }

      // 5. Then "Aahish" (first name only) gets sucked into the black hole the
      // same way... and a cursor rises up, grabs it back out, and drops it back
      // into place. "Abbani" never moves.
      if (firstName && nameCenter && cursor) {
        const { dx, dy } = addVortex(firstName, nameCenter, 0.7, "+=0.0");

        // Local (section-relative) coordinates for the cursor.
        const bhLocal = { x: blackHole.x - s.left, y: blackHole.y - s.top };
        const slotLocal = { x: nameCenter.x - s.left, y: nameCenter.y - s.top };

        // Cursor rises up from below into the black hole.
        tl.set(cursor, { x: slotLocal.x, y: slotLocal.y + 90, autoAlpha: 0, scale: 0.9 }, ">");
        tl.to(cursor, { autoAlpha: 1, duration: 0.15 }, "<");
        tl.to(cursor, { x: bhLocal.x, y: bhLocal.y, duration: 0.6, ease: "power2.inOut" }, "<");

        // Grab: the name pops back out of the hole, tiny, attached to the cursor.
        tl.set(firstName, { opacity: 1, scale: 0.25, rotation: 0, x: dx, y: dy });
        tl.to(cursor, { scale: 0.8, duration: 0.08, yoyo: true, repeat: 1 });

        // Carry it back down and drop it into its slot (cursor + name move as one).
        tl.addLabel("restore");
        tl.to(firstName, { x: 0, y: 0, scale: 1, duration: 0.95, ease: "power3.out" }, "restore");
        tl.to(cursor, { x: slotLocal.x, y: slotLocal.y, duration: 0.95, ease: "power3.out" }, "restore");

        // Little click, then the cursor leaves.
        tl.to(cursor, { scale: 0.85, duration: 0.08, yoyo: true, repeat: 1 });
        tl.to(cursor, { autoAlpha: 0, duration: 0.3 }, "+=0.05");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <section ref={sectionRef} className="relative w-full h-screen min-h-[600px] overflow-hidden bg-bg">
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
        
        {/* Name wrapper is relative so the greeting can float above it without
            affecting layout when it gets sucked into the black hole. */}
        <div className="relative">
          <div className="absolute bottom-full left-0 right-0 mb-5 md:mb-8 text-center pointer-events-none">
            <span
              ref={greetingRef}
              className="inline-flex flex-col items-center gap-1 md:gap-2 font-display italic text-white whitespace-nowrap opacity-0"
            >
              <span ref={handRef} className="block w-full text-center text-6xl md:text-8xl lg:text-9xl leading-none">👋</span>
              <span ref={greetingTextRef} className="block w-full text-center text-3xl md:text-5xl lg:text-6xl">Hey, I'm</span>
            </span>
          </div>

          {/* Sits over the dark hero image — kept white in both themes. */}
          <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-white mb-6 opacity-0">
            <span ref={firstNameRef} className="inline-block">Atharv</span>{' '}Anand
          </h1>
        </div>

        <div className="blur-in text-lg md:text-2xl lg:text-3xl font-body text-white/70 mb-12 opacity-0">
          A{' '}
          <span key={roleIndex} className="font-display italic text-white animate-role-fade-in inline-block px-1">
            {roles[roleIndex]}
          </span>
          {' '}who lives in Massachusetts.
        </div>



      </div>

      {/* Cursor used to fetch "Aahish" back out of the black hole. */}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 z-20 text-white opacity-0 pointer-events-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
      >
        <MousePointer2 className="w-7 h-7 md:w-9 md:h-9 fill-white" />
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
