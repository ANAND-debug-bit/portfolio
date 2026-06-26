import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const entries = [
  {
    title: "Designing for Spatial Computing",
    date: "OCT 12, 2025",
    readTime: "5 MIN READ",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "The Typography of Motion",
    date: "SEP 28, 2025",
    readTime: "8 MIN READ",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Embracing Imperfection in UI",
    date: "AUG 14, 2025",
    readTime: "4 MIN READ",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Building Systems, Not Pages",
    date: "JUL 03, 2025",
    readTime: "12 MIN READ",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function Journal() {
  return (
    <section className="bg-bg py-16 md:py-24">
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
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Journal</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-body tracking-tight text-text-primary mb-4">
              Recent <span className="font-display italic">thoughts</span>
            </h2>
            
            <p className="text-muted text-sm md:text-base">
              Ramblings on design, technology, and everything in between.
            </p>
          </div>

          <button className="hidden md:inline-flex group relative rounded-full text-sm px-6 py-3 bg-surface text-text-primary border border-stroke hover:border-transparent transition-all duration-300">
            <span className="absolute inset-[-1px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-300" />
            <span className="absolute inset-[1px] bg-bg rounded-full opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center gap-2">
              View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </motion.div>

        {/* Entries List */}
        <div className="flex flex-col gap-4">
          {entries.map((entry, i) => (
            <motion.a
              href="#"
              key={entry.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-3 sm:p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[32px] sm:rounded-full transition-colors duration-500 cursor-pointer"
            >
              {/* Image Thumbnail */}
              <div className="w-full sm:w-20 h-40 sm:h-20 rounded-3xl sm:rounded-full overflow-hidden shrink-0">
                <img 
                  src={entry.image} 
                  alt={entry.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2 sm:px-4">
                <h3 className="text-xl md:text-2xl font-body text-text-primary group-hover:text-accent transition-colors">
                  {entry.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-muted font-medium tracking-wider">
                  <span>{entry.date}</span>
                  <div className="w-1 h-1 rounded-full bg-stroke" />
                  <span>{entry.readTime}</span>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full border border-stroke bg-bg group-hover:bg-text-primary group-hover:border-text-primary transition-all duration-300 shrink-0 mr-2">
                <ArrowRight className="w-5 h-5 text-text-primary group-hover:text-bg group-hover:-rotate-45 transition-all duration-300" />
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
