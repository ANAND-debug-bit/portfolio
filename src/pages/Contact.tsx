import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { ArrowUpRight } from 'lucide-react';

const socials = [
  { name: "Instagram", handle: "@aahishabbani", url: "https://www.instagram.com/aahishabbani/", icon: FaInstagram },
  { name: "X (Twitter)", handle: "@AahishAbbani", url: "https://x.com/AahishAbbani", icon: FaTwitter },
  { name: "LinkedIn", handle: "Aahish Abbani", url: "https://www.linkedin.com/in/aahish-abbani/", icon: FaLinkedin },
  { name: "GitHub", handle: "kinghightech", url: "https://github.com/kinghightech", icon: FaGithub }
];

export default function ContactPage() {
  return (
    <div className="bg-bg min-h-screen pt-32 pb-24 relative overflow-hidden">
      
      {/* Background radial gradient for sick aesthetic */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20 md:mb-32 flex flex-col items-center text-center"
        >
          <div className="w-12 h-px bg-stroke mb-8" />
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display italic tracking-tight text-text-primary mb-6 leading-normal flex flex-wrap justify-center items-center gap-4">
            <span>Let's</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#89AACC] to-[#4E85BF] pb-2">
              connect.
            </span>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#89AACC]">
              <motion.path 
                d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                animate={{ x: [2, -2, 2] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
              <motion.path 
                d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                animate={{ x: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
            </svg>
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto mb-12">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a 
              href="mailto:aahish.abbani@icloud.com"
              className="group relative inline-flex rounded-full text-lg md:text-xl px-8 py-4 bg-surface text-text-primary transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(78,133,191,0.3)]"
            >
              <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <span className="absolute inset-[2px] bg-bg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <div className="relative z-10 flex items-center gap-3 font-medium">
                aahish.abbani@icloud.com <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </a>

            <a 
              href="tel:+17747788352"
              className="group relative inline-flex rounded-full text-lg md:text-xl px-8 py-4 bg-surface text-text-primary transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(78,133,191,0.3)]"
            >
              <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <span className="absolute inset-[2px] bg-bg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <div className="relative z-10 flex items-center gap-3 font-medium">
                +1 (774)-778-8352 <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </a>
          </div>
        </motion.div>

        {/* Social Links Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {socials.map((social, i) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                className="group relative h-48 md:h-64 bg-surface/30 hover:bg-surface border border-stroke rounded-[32px] md:rounded-[40px] p-6 md:p-10 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:shadow-[0_0_40px_rgba(78,133,191,0.3)]"
              >
                {/* Top: Icon */}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-bg border border-stroke flex items-center justify-center group-hover:border-text-primary/30 transition-colors">
                    <Icon className="w-5 h-5 text-text-primary group-hover:text-accent transition-colors" />
                  </div>
                </div>

                {/* Bottom: Text */}
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-display italic text-text-primary mb-1">{social.name}</h3>
                  <p className="text-sm md:text-base text-muted font-medium">{social.handle}</p>
                </div>

                {/* Top Right Arrow */}
                <div className="absolute top-6 right-6 md:top-10 md:right-10 z-10">
                  <div className="w-10 h-10 rounded-full border border-stroke bg-bg flex items-center justify-center group-hover:bg-text-primary group-hover:border-text-primary transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-text-primary group-hover:text-bg group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-all" />
                  </div>
                </div>

                {/* Giant Faded Icon in Background */}
                <Icon className="absolute -bottom-8 -right-8 w-48 h-48 md:w-64 md:h-64 text-text-primary/[0.03] group-hover:text-text-primary/[0.08] transition-colors duration-500 group-hover:scale-110 group-hover:-rotate-12" />
                
                {/* Hover Gradient Border overlay */}
                <div className="absolute inset-0 border border-transparent rounded-[32px] md:rounded-[40px] group-hover:border-stroke transition-colors duration-500 pointer-events-none" />
              </motion.a>
            );
          })}
        </div>

      </div>
    </div>
  );
}
