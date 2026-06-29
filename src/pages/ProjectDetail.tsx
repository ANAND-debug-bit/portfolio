import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Award, Check, Mail } from 'lucide-react';

import ProjectCarousel from '../components/ProjectCarousel';
import { projects, projectImageSrc, type Project } from '../data/projects';
import { cn } from '../lib/utils';

const EASE = [0.25, 0.1, 0.25, 1] as const;

const BLUE_BUTTON =
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#2563EB] px-6 py-3 text-sm font-medium text-white shadow-[0_8px_22px_-6px_rgba(37,99,235,0.6)] transition-colors hover:bg-[#1D4ED8]';

const PROJECT_ACTION_BUTTON = cn(
  BLUE_BUTTON,
  'px-4 py-2.5 text-sm shadow-[0_10px_28px_-8px_rgba(37,99,235,0.68)] sm:px-5 sm:py-3 md:px-7 md:py-3.5 md:text-base',
);

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  CSS: '#7C3AED',
  HTML: '#E34F26',
  Swift: '#FA7343',
  PLpgSQL: '#336791',
  Ruby: '#CC342D',
  Other: '#8B949E',
};

const languagePercentFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
});

function languageColor(language: string) {
  return LANGUAGE_COLORS[language] ?? LANGUAGE_COLORS.Other;
}

function LanguageComposition({ languages }: { languages?: Project['languages'] }) {
  const visibleLanguages = (languages ?? []).filter((language) => language.value > 0);

  if (visibleLanguages.length === 0) return null;

  const total = visibleLanguages.reduce((sum, language) => sum + language.value, 0);
  let cursor = 0;
  const gradientStops = visibleLanguages
    .map((language) => {
      const start = (cursor / total) * 100;
      cursor += language.value;
      const end = (cursor / total) * 100;

      return `${languageColor(language.name)} ${start.toFixed(3)}% ${end.toFixed(3)}%`;
    })
    .join(', ');

  return (
    <section className="mt-10 border-t border-stroke pt-8" aria-label="Language composition">
      <div className="grid gap-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-center md:grid-cols-1 lg:grid-cols-[9rem_minmax(0,1fr)]">
        <div
          className="relative h-[8.5rem] w-[8.5rem] shrink-0 rounded-full shadow-[0_16px_44px_-30px_rgba(255,255,255,0.45)]"
          style={{ background: `conic-gradient(from -90deg, ${gradientStops})` }}
          aria-hidden="true"
        >
          <div className="absolute inset-[10%] flex items-center justify-center rounded-full border border-stroke bg-bg text-center shadow-[inset_0_0_20px_rgba(255,255,255,0.035)]">
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted">Languages</span>
          </div>
        </div>

        <ul className="grid min-w-0 justify-start gap-2.5 sm:justify-stretch">
          {visibleLanguages.map((language) => (
            <li
              key={language.name}
              className="grid w-fit max-w-full grid-cols-[auto_auto_auto] items-center gap-2.5 sm:w-full sm:grid-cols-[auto_minmax(0,1fr)_auto]"
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: languageColor(language.name) }}
                aria-hidden="true"
              />
              <span className="truncate text-sm text-text-primary/85">{language.name}</span>
              <span className="font-mono text-xs text-muted">
                {languagePercentFormatter.format(language.value)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project: Project | undefined = projects.find((p) => p.id === id);

  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [id]);

  // Unknown id — show a clean, friendly fallback instead of a blank page.
  if (!project) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <span className="text-[11px] uppercase tracking-[0.3em] text-accent">404</span>
        <h1 className="mt-4 font-display text-5xl italic text-text-primary">Project not found</h1>
        <p className="mt-4 text-muted">
          The project you're looking for doesn't exist or may have moved.
        </p>
        <Link to="/projects" className={cn(BLUE_BUTTON, 'mt-8')}>
          <ArrowLeft className="h-4 w-4" />
          Back to all projects
        </Link>
      </div>
    );
  }

  // Cover first, then the rest — the whole deck the carousel flips through.
  const images = [projectImageSrc(project), ...(project.gallery ?? [])];

  // The next project in the list — gives the page a natural "keep browsing" end.
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const projectAction = (className?: string) =>
    project.link ? (
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className={cn(PROJECT_ACTION_BUTTON, 'group', className)}
      >
        View live project
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    ) : (
      <Link to="/contact" className={cn(PROJECT_ACTION_BUTTON, className)}>
        <Mail className="h-4 w-4" />
        Get in touch
      </Link>
    );

  return (
    <article className="bg-bg pb-24 pt-24 md:pt-28">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 md:px-10">
        {/* Back link */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            All projects
          </Link>
        </motion.div>

        {/* Title + intro + primary action */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-10 md:mt-12"
        >
          <div className="max-w-4xl text-left">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="text-[11px] uppercase tracking-[0.28em] text-accent">
                {project.type}
              </span>
              {project.year && (
                <span className="font-mono text-[11px] tracking-[0.15em] text-muted">
                  {project.year}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:gap-4 md:gap-6">
            <h1 className="font-display text-5xl italic leading-[0.98] tracking-tight text-text-primary min-[430px]:text-6xl sm:text-7xl md:text-8xl">
              {project.name}
            </h1>

            {projectAction('justify-self-end md:translate-y-1')}
          </div>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg md:mt-5">
            {project.description}
          </p>
        </motion.header>

        {/* Image carousel — large, but framed tightly so the screenshots stay clean. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="mt-8 md:mt-11"
        >
          <ProjectCarousel images={images} alt={project.name} />
        </motion.div>

        {/* Award ribbon */}
        {project.award && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto mt-12 flex max-w-3xl items-center gap-4 rounded-2xl border border-stroke bg-surface px-5 py-4"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full accent-gradient text-bg">
              <Award className="h-5 w-5" />
            </span>
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-muted">Recognition</div>
              <div className="mt-0.5 font-medium text-text-primary">{project.award}</div>
            </div>
          </motion.div>
        )}

        {/* Overview + highlights */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-12 md:mt-20 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="md:col-span-7"
          >
            <h2 className="mb-5 text-[11px] uppercase tracking-[0.28em] text-muted">Overview</h2>
            <p className="text-lg leading-relaxed text-text-primary/90">{project.overview}</p>
          </motion.div>

          {project.highlights && project.highlights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="md:col-span-5"
            >
              <h2 className="mb-5 text-[11px] uppercase tracking-[0.28em] text-muted">Highlights</h2>
              <ul className="space-y-4">
                {project.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-stroke text-accent">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="leading-relaxed text-text-primary/90">{item}</span>
                  </li>
                ))}
              </ul>
              <LanguageComposition languages={project.languages} />
            </motion.div>
          )}
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="mx-auto mt-12 flex max-w-5xl flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-stroke px-4 py-1.5 text-sm text-muted">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Next project */}
        {nextProject && nextProject.id !== project.id && (
          <Link
            to={`/projects/${nextProject.id}`}
            className="group mx-auto mt-20 flex max-w-5xl items-center justify-between gap-6 rounded-3xl border border-stroke bg-surface p-6 transition-colors hover:border-accent/40 md:mt-24 md:p-8"
          >
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-[0.28em] text-muted">Next project</div>
              <div className="mt-2 truncate font-display text-3xl italic text-text-primary md:text-4xl">
                {nextProject.name}
              </div>
              <div className="mt-1 text-sm text-muted">{nextProject.type}</div>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stroke text-text-primary transition-all group-hover:bg-text-primary group-hover:text-bg">
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        )}
      </div>
    </article>
  );
}
