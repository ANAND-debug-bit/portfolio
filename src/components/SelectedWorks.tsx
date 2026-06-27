import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import MagneticCard from './MagneticCard';
import { projects as allProjects, projectImageSrc } from '../data/projects';

// Layout for the bento grid, paired with featured projects by id.
const layout = [
  { id: 'om-daily', span: 'md:col-span-7', aspect: 'aspect-[4/3] md:aspect-[16/9]' },
  { id: 'kastrals', span: 'md:col-span-5', aspect: 'aspect-[4/3] md:aspect-[4/5]' },
  { id: 'haven', span: 'md:col-span-5', aspect: 'aspect-[4/3] md:aspect-[4/5]' },
  { id: 'khet', span: 'md:col-span-7', aspect: 'aspect-[4/3] md:aspect-[16/9]' },
];

const projects = layout.flatMap(({ id, span, aspect }) => {
  const project = allProjects.find((p) => p.id === id);
  if (!project) return [];
  return [{ id: project.id, title: project.name, span, aspect, image: projectImageSrc(project) }];
});

export default function SelectedWorks() {
  return (
    <section id="work" className="bg-bg py-12 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-body tracking-tight text-text-primary mb-4">
              Featured <span className="font-display italic">projects</span>
            </h2>
            
            <p className="text-muted text-sm md:text-base">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>

          <Link
            to="/projects"
            className="hidden md:inline-flex group relative rounded-full text-sm px-6 py-3 bg-surface text-text-primary border border-stroke hover:border-transparent transition-all duration-300"
          >
            <span className="absolute inset-[-1px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-300" />
            <span className="absolute inset-[1px] bg-bg rounded-full opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center gap-2">
              View all work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <MagneticCard
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              className={`group bg-surface border border-stroke rounded-3xl cursor-pointer ${project.span} ${project.aspect}`}
            >
              {/* Background Image */}
              <img 
                src={project.image} 
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Halftone Overlay */}
              <div 
                className="absolute inset-0 opacity-20 mix-blend-multiply"
                style={{
                  backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                  backgroundSize: '4px 4px'
                }}
              />

              {/* Hover Darken + Blur */}
              <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-all duration-500 flex items-center justify-center">
                
                {/* Hover Label Pill */}
                <div className="relative transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <div className="absolute inset-[-2px] rounded-full accent-gradient animate-gradient-shift background-size-200" />
                  <div className="relative bg-white text-bg px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium">
                    View <span className="font-display italic text-base translate-y-[1px]">{project.title}</span>
                  </div>
                </div>

              </div>

              {/* Click-through to the project's own page */}
              <Link
                to={`/projects/${project.id}`}
                aria-label={`View ${project.title}`}
                className="absolute inset-0 z-10"
              />
            </MagneticCard>
          ))}
        </div>

      </div>
    </section>
  );
}
