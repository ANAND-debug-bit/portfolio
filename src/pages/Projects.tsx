import { useState } from 'react';
import { motion } from 'framer-motion';

import ProjectsGallery from '../components/ProjectsGallery';
import ProjectsCarousel from '../components/ProjectsCarousel';
import ProjectModal from '../components/ProjectModal';
import { projects, type Project } from '../data/projects';

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <div className="bg-bg min-h-screen pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 md:mb-16 text-center flex flex-col items-center"
        >
          <div className="w-12 h-px bg-stroke mb-8" />
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display italic tracking-tight text-text-primary mb-6">
            All Projects
          </h1>
          <p className="text-muted text-lg max-w-md">
            A comprehensive archive of selected works, experiments, and case studies.
          </p>
        </motion.div>

        {/* Featured carousel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ProjectsCarousel projects={projects} onSelect={setSelected} />
        </motion.div>

        {/* Scroll-to-explore cue */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-4 mb-10 flex flex-col items-center gap-3 md:mt-6 md:mb-14"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-muted">
            Scroll to view all
          </span>
          <div className="relative h-12 w-px overflow-hidden bg-stroke">
            <div className="accent-gradient animate-scroll-down h-full w-full" />
          </div>
        </motion.div>

        {/* Full gallery */}
        <ProjectsGallery projects={projects} onSelect={setSelected} />
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
