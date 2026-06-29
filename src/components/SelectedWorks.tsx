import { type CSSProperties, useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { projects as allProjects, projectImageSrc, type Project } from '../data/projects';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

type ProjectPreview = {
  project: Project;
  size: string;
  left: string; // horizontal position along the wordmark (% of the group)
  top: string; // vertical position (% of viewport height)
  mobileTop?: string; // phone-specific vertical position
  rotation: string;
  imageFit: string;
  layer: 'front' | 'back';
};

// Five featured projects. Each image is pinned to a fixed spot ON the giant
// wordmark (same moving group), so it never drifts relative to the text.
const featuredOrder = ['om-daily', 'kastrals', 'medora', 'khet', 'haven'] as const;

const previewStyles: Record<string, Omit<ProjectPreview, 'project'>> = {
  'om-daily': {
    size: 'w-[145px] min-[430px]:w-[160px] sm:w-[230px] md:w-[260px] lg:w-[290px] aspect-[3/4]',
    left: '15%',
    top: '40%',
    mobileTop: '31%',
    rotation: '-rotate-3',
    imageFit: 'object-cover',
    layer: 'front',
  },
  kastrals: {
    size: 'w-[220px] min-[430px]:w-[245px] sm:w-[410px] md:w-[480px] lg:w-[540px] aspect-[16/10]',
    left: '33%',
    top: '66%',
    rotation: '-rotate-2',
    imageFit: 'object-cover',
    layer: 'front',
  },
  medora: {
    size: 'w-[145px] min-[430px]:w-[162px] sm:w-[235px] md:w-[265px] lg:w-[295px] aspect-[3/4]',
    left: '51%',
    top: '32%',
    rotation: 'rotate-2',
    imageFit: 'object-cover',
    layer: 'front',
  },
  khet: {
    size: 'w-[220px] min-[430px]:w-[245px] sm:w-[405px] md:w-[470px] lg:w-[520px] aspect-[16/10]',
    left: '69%',
    top: '62%',
    rotation: 'rotate-3',
    imageFit: 'object-cover',
    layer: 'front',
  },
  haven: {
    size: 'w-[215px] min-[430px]:w-[240px] sm:w-[360px] md:w-[410px] lg:w-[450px] aspect-[4/3]',
    left: '88%',
    top: '42%',
    mobileTop: '32%',
    rotation: '-rotate-3',
    imageFit: 'object-cover',
    layer: 'front',
  },
};

const marqueeFont =
  "'Rosindale Display Condensed', 'Rosindale Display', 'Instrument Serif', Georgia, serif";

// Evenly-spaced bright-blue dot grid, used behind the wordmark AND around the
// black hole. One colour, a touch bigger/brighter, generously spaced.
const DOT_FIELD = {
  backgroundImage:
    'radial-gradient(circle, rgba(99,179,255,0.55) 1.8px, transparent 2.4px)',
  backgroundSize: '50px 50px',
} as const;

function ProjectCard({ preview, index }: { preview: ProjectPreview; index: number }) {
  const { project, size, left, top, mobileTop, rotation, imageFit, layer } = preview;
  return (
    <article
      className={cn(
        'absolute left-[var(--preview-left)] top-[var(--preview-mobile-top)] -translate-x-1/2 -translate-y-1/2 sm:top-[var(--preview-top)]',
        size,
        rotation,
        layer === 'back' ? 'z-0' : 'z-20',
      )}
      style={
        {
          '--preview-left': left,
          '--preview-top': top,
          '--preview-mobile-top': mobileTop ?? top,
        } as CSSProperties
      }
    >
      <Link
        to={`/projects/${project.id}`}
        aria-label={`View ${project.name}`}
        className="group block h-full w-full overflow-hidden rounded-[8px] border border-white/15 bg-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
      >
        <img
          src={projectImageSrc(project)}
          alt={project.name}
          className={cn(
            'h-full w-full transition-transform duration-700 group-hover:scale-105',
            imageFit,
          )}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/8 to-transparent opacity-80" />

        <div className="absolute left-3 right-3 top-3 flex items-center justify-between gap-2 text-[8px] uppercase tracking-[0.2em] text-white/70 sm:left-5 sm:right-5 sm:top-5 sm:text-[10px] sm:tracking-[0.24em]">
          <span>{String(index + 1).padStart(2, '0')}</span>
          {project.year && <span className="text-right">{project.year}</span>}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 md:p-6">
          <div className="mb-1.5 text-[8px] uppercase tracking-[0.2em] text-white/60 sm:mb-2 sm:text-[10px] sm:tracking-[0.24em]">
            {project.type}
          </div>
          <div className="flex items-end justify-between gap-2 sm:gap-4">
            <h3
              className="text-2xl leading-none tracking-normal text-white min-[430px]:text-3xl sm:text-4xl md:text-5xl"
              style={{ fontFamily: marqueeFont }}
            >
              {project.name}
            </h3>
            <span className="mb-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:mb-1 sm:size-9">
              <ArrowUpRight className="size-3.5 sm:size-4" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default function SelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const bhOverlayRef = useRef<HTMLDivElement>(null);
  const bhImageRef = useRef<HTMLImageElement>(null);
  const bhHintRef = useRef<HTMLDivElement>(null);
  const lostHandRef = useRef<HTMLDivElement>(null);

  const previews = useMemo<ProjectPreview[]>(
    () =>
      featuredOrder.flatMap((id) => {
        const project = allProjects.find((item) => item.id === id);
        if (!project) return [];
        return [{ project, ...previewStyles[id] }];
      }),
    [],
  );

  useLayoutEffect(() => {
    if (!sectionRef.current || !groupRef.current) return;

    const section = sectionRef.current;
    const group = groupRef.current;
    const overlay = bhOverlayRef.current;
    const bhImage = bhImageRef.current;
    const bhHint = bhHintRef.current;
    const lostHand = lostHandRef.current;
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
        // Live measurements so the split never depends on build-time layout
        // (fonts load late, which would otherwise mis-size the text width).
        const zoomPx = () => window.innerHeight * 1.25; // scroll budget for the zoom
        const distancePx = () => Math.max(0, group.scrollWidth - window.innerWidth);
        const totalPx = () => zoomPx() + Math.max(distancePx(), window.innerWidth);

        // One pin, two phases driven manually: (1) fly into the black hole, which
        // dissolves to reveal the projects already behind it, then (2) the
        // horizontal parallax. No dead scroll between them.
        const apply = (progress: number) => {
          const px = progress * totalPx();
          const zp = zoomPx();
          const z = clamp01(px / zp); // zoom phase 0..1

          // Fills the screen at rest (so no dots leak around the outside);
          // eased so it lingers, then accelerates into the dotted core.
          gsap.set(bhImage, { scale: 1 + Math.pow(z, 2) * 10, transformOrigin: '50% 50%' });
          gsap.set(bhHint, { autoAlpha: clamp01(1 - z / 0.35) });
          // Dissolve the black hole over the deep part of the zoom (z 0.5 -> 0.9).
          gsap.set(overlay, { autoAlpha: clamp01(1 - (z - 0.5) / 0.4) });

          // Horizontal scroll begins once the zoom budget is spent.
          const h = Math.max(0, px - zp);
          const distance = distancePx();
          gsap.set(group, { x: -Math.min(h, distance) });

          const horizontalP = distance > 0 ? clamp01(h / distance) : 0;
          const handP = clamp01((horizontalP - 0.66) / 0.24);
          const handEase = 0.5 - Math.cos(handP * Math.PI) / 2;
          gsap.set(lostHand, {
            autoAlpha: handP > 0.02 && handP < 0.98 ? Math.min(1, Math.sin(handP * Math.PI) * 1.4) : 0,
            x: window.innerWidth * (0.68 - handEase * 0.18 + Math.sin(handP * Math.PI * 2) * 0.025),
            y: window.innerHeight * (-0.16 + handEase * 1.24),
            rotation: -12 + Math.sin(handP * Math.PI * 9) * 18 + handP * 18,
            scale: 0.9 + Math.sin(handP * Math.PI) * 0.28,
            transformOrigin: '65% 70%',
          });
        };

        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: () => `+=${totalPx()}`,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => apply(self.progress),
          onRefresh: (self) => apply(self.progress),
        });

        const refresh = () => ScrollTrigger.refresh();
        const images = Array.from(section.querySelectorAll('img'));
        images.forEach((image) => image.addEventListener('load', refresh, { once: true }));
        if (document.fonts?.ready) document.fonts.ready.then(refresh);
        refresh();
      }, section);

      return () => ctx.revert();
    });

    media.add('(prefers-reduced-motion: reduce)', () => {
      // No zoom: hide the black hole overlay and show the projects statically.
      gsap.set(group, { clearProps: 'transform' });
      if (overlay) gsap.set(overlay, { autoAlpha: 0 });
      if (lostHand) gsap.set(lostHand, { autoAlpha: 0 });
    });

    return () => media.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-bg text-text-primary"
    >
      <div className="relative h-screen min-h-[680px] w-full overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-5 z-40 -translate-x-1/2 text-[11px] uppercase tracking-[0.28em] text-muted">
          Selected work
        </div>

        {/* Blue dot grid backdrop. Fixed (doesn't scroll sideways). */}
        <div className="pointer-events-none absolute inset-0 z-0" style={DOT_FIELD} />

        {/* One moving group: the huge wordmark plus the images pinned onto it.
            Starts with the text already on-screen so the black hole reveals it. */}
        <div
          ref={groupRef}
          className="absolute inset-y-0 left-0 z-10 flex items-center whitespace-nowrap pl-[10vw] pr-[16vw] will-change-transform"
        >
          <span
            className="pointer-events-none relative z-10 text-[34vh] font-medium leading-[0.72] tracking-tight text-text-primary sm:text-[50vh] md:text-[72vh] lg:text-[90vh] xl:text-[98vh]"
            style={{ fontFamily: marqueeFont, transform: 'translateY(-4vh)' }}
            aria-hidden="true"
          >
            Here are some of my projects
          </span>

          {previews.map((preview, index) => (
            <ProjectCard key={preview.project.id} preview={preview} index={index} />
          ))}
        </div>

        <div className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4 text-muted md:bottom-8">
          <span className="h-px w-12 bg-stroke" />
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 whitespace-nowrap text-xs uppercase tracking-[0.24em] transition-colors hover:text-text-primary"
          >
            All projects
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <span className="h-px w-12 bg-stroke" />
        </div>

        <div
          ref={lostHandRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-30 text-7xl opacity-0 drop-shadow-[0_14px_24px_rgba(0,0,0,0.55)] will-change-transform md:text-8xl"
        >
          👋
        </div>

        {/* Black hole intro overlay — zooms into the core, then dissolves to
            reveal the projects above. The blue dot grid sits behind it and the
            image's CORE is masked transparent, so the dots show *inside* the
            black hole's circle (and nowhere else — the image covers the rest). */}
        <div ref={bhOverlayRef} className="absolute inset-0 z-50 overflow-hidden bg-bg">
          <div className="pointer-events-none absolute inset-0" style={DOT_FIELD} />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              // Keep the dot-revealing core fixed to the viewport while the JPG
              // zooms behind it; putting this mask on the scaled image makes the
              // transparent centre grow until it covers the whole screen on reverse.
              maskImage: 'radial-gradient(circle at 50% 50%, transparent 20vh, #000 34vh)',
              WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent 20vh, #000 34vh)',
            }}
          >
            <img
              ref={bhImageRef}
              src="/black-hole.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover will-change-transform"
              style={{
                transformOrigin: '50% 50%',
              }}
            />
          </div>

          {/* Lift the JPG's pure-black space (#000) up to the site background
              (a touch lighter than black) so the section's surround matches the
              hero above instead of reading darker. `lighten` only raises pixels
              darker than --bg, leaving the stars and blue glow untouched. Dark
              theme only — in light mode --bg is near-white and would wash it out. */}
          <div
            className="pointer-events-none absolute inset-0 hidden mix-blend-lighten dark:block"
            style={{ background: 'var(--bg)' }}
          />

          {/* Fade the image's textured outer field (stars / blue tint) out to the
              flat site background, so the surround is the SAME flat colour as the
              hero — not just a matched black, but actually seamless. Centre stays
              clear so the black hole + glow are untouched. Uses var(--bg), so it
              is correct in both light and dark themes. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, transparent 40vh, var(--bg) 72vh)',
            }}
          />

          {/* Blend the section seams into the hero above / projects below. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bg to-transparent" />

          <div
            ref={bhHintRef}
            className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-white/60"
          >
            Scroll into the void
          </div>
        </div>
      </div>
    </section>
  );
}
