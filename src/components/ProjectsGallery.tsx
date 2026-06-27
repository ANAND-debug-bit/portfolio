import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import MagneticCard from './MagneticCard';
import { projectImageSrc, type Project } from '../data/projects';

function GalleryCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}) {
  const number = String(index + 1).padStart(2, '0');

  return (
    <MagneticCard
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="group aspect-[4/5] rounded-3xl border border-stroke bg-surface"
    >
      {/* Image — full color, subtle zoom on hover */}
      <img
        src={projectImageSrc(project)}
        alt={project.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Index badge (sits over the image, always white) */}
      <span className="absolute top-5 left-5 z-10 font-mono text-xs tracking-[0.3em] text-white/85 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
        {number}
      </span>

      {project.year && (
        <span className="absolute top-5 right-5 z-10 font-mono text-xs tracking-[0.2em] text-white/70 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
          {project.year}
        </span>
      )}

      {/* Bottom gradient + info (theme-aware) */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

      <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-7">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-5 bg-accent transition-all duration-500 group-hover:w-8" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-accent">
            {project.type}
          </span>
        </div>

        <h3 className="font-display text-2xl italic text-text-primary md:text-3xl">
          {project.name}
        </h3>

        {/* Short description — slides up + fades in on hover */}
        <p className="mt-0 max-h-0 overflow-hidden text-sm text-muted opacity-0 transition-all duration-500 ease-out group-hover:mt-3 group-hover:max-h-24 group-hover:opacity-100">
          {project.description}
        </p>
      </div>

      {/* Click-through arrow + full-card trigger (opens the detail popup) */}
      <div className="absolute top-5 right-5 z-20 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-text-primary text-bg opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4" />
      </div>
      <button
        type="button"
        onClick={() => onSelect(project)}
        aria-label={`View ${project.name}`}
        className="absolute inset-0 z-30 cursor-pointer"
      />

      {/* Hover border */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition-colors duration-500 group-hover:border-stroke" />
    </MagneticCard>
  );
}

export default function ProjectsGallery({
  projects,
  onSelect,
}: {
  projects: Project[];
  onSelect: (project: Project) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3"
    >
      {projects.map((project, i) => (
        <GalleryCard key={project.id} project={project} index={i} onSelect={onSelect} />
      ))}
    </motion.div>
  );
}
