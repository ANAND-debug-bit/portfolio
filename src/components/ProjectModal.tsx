import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Award, Check, Mail, X } from 'lucide-react';

import { projectImageSrc, type Project } from '../data/projects';
import { cn } from '../lib/utils';

const EASE = [0.25, 0.1, 0.25, 1] as const;

// One cool, solid blue CTA (no gradient) reused by both button variants.
const BLUE_BUTTON =
  'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#2563EB] px-4 py-2 text-sm font-medium text-white shadow-[0_6px_18px_-4px_rgba(37,99,235,0.55)] transition-colors hover:bg-[#1D4ED8]';

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  // All images for the active project: cover first, then the rest.
  const images = project ? [projectImageSrc(project), ...(project.gallery ?? [])] : [];
  const [active, setActive] = useState(0);

  // Reset the viewer to the cover whenever a different project opens.
  useEffect(() => {
    setActive(0);
  }, [project?.id]);

  // Close on Escape and lock body scroll while the popup is open.
  useEffect(() => {
    if (!project) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  const activeSrc = images[active] ?? images[0];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal"
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close project"
            onClick={onClose}
            className="absolute inset-0 bg-bg/70 backdrop-blur-md"
          />

          {/* Panel — fixed media + header, only the body scrolls. */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.name}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-stroke bg-surface shadow-2xl sm:rounded-3xl"
          >
            {/* Close button */}
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-stroke bg-bg/50 text-text-primary backdrop-blur-md transition-colors hover:bg-stroke/60"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Media viewer (fixed) — contains the image with a blurred fill,
                so wide web shots and tall phone shots both sit nicely. */}
            <div className="relative h-56 w-full shrink-0 overflow-hidden bg-bg sm:h-64">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSrc}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  <img
                    src={activeSrc}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
                  />
                  <img
                    src={activeSrc}
                    alt={project.name}
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail strip (fixed) — click to switch images. */}
            {images.length > 1 && (
              <div
                data-lenis-prevent
                className="flex shrink-0 gap-2 overflow-x-auto border-b border-stroke bg-surface px-4 py-3"
              >
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    aria-label={`View image ${i + 1}`}
                    aria-current={i === active ? 'true' : undefined}
                    onClick={() => setActive(i)}
                    className={cn(
                      'h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition-all',
                      i === active
                        ? 'border-accent opacity-100'
                        : 'border-stroke opacity-55 hover:opacity-100',
                    )}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Header (fixed) — title on the left, blue action top-right. */}
            <div className="shrink-0 border-b border-stroke px-6 py-5 md:px-7">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="mb-2.5 flex items-center gap-2">
                    <span className="h-px w-6 bg-accent" />
                    <span className="text-[11px] uppercase tracking-[0.28em] text-accent">
                      {project.type}
                    </span>
                    {project.year && (
                      <span className="ml-1 font-mono text-[11px] tracking-[0.15em] text-muted">
                        {project.year}
                      </span>
                    )}
                  </div>
                  <h2 className="font-display text-3xl italic leading-tight text-text-primary md:text-4xl">
                    {project.name}
                  </h2>
                </div>

                {project.link ? (
                  <a href={project.link} target="_blank" rel="noreferrer" className={cn(BLUE_BUTTON, 'group')}>
                    View project
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <Link to="/contact" onClick={onClose} className={BLUE_BUTTON}>
                    <Mail className="h-4 w-4" />
                    Contact me
                  </Link>
                )}
              </div>
            </div>

            {/* Body (scrolls) — data-lenis-prevent lets this scroll natively
                instead of being swallowed by the page's smooth-scroll. */}
            <div
              data-lenis-prevent
              className="min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain p-6 md:p-7"
            >
              {project.award && (
                <div className="flex items-center gap-3 rounded-2xl border border-stroke bg-bg/40 px-4 py-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full accent-gradient text-bg">
                    <Award className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-text-primary">{project.award}</span>
                </div>
              )}

              <p className="text-[15px] leading-relaxed text-muted md:text-base">
                {project.overview}
              </p>

              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h3 className="mb-4 text-[11px] uppercase tracking-[0.28em] text-muted">
                    Highlights
                  </h3>
                  <ul className="space-y-3">
                    {project.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-stroke text-accent">
                          <Check className="h-3 w-3" />
                        </span>
                        <span className="text-sm leading-relaxed text-text-primary/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-stroke px-3 py-1 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
