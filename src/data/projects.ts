/**
 * Project list — the single source of truth for the Projects page
 * (both the Gallery and the Carousel read from here).
 *
 * To add a project, copy an entry and edit the fields:
 *   - name:        title shown big
 *   - type:        small label, e.g. "Web Design", "iOS App"
 *   - description: one short line (shown on hover in the gallery,
 *                  and under the active slide in the carousel)
 *   - image:       any image URL (or a path in /public)
 *   - link:        OPTIONAL — live site / writeup. Omit for non-clickable.
 *   - year:        OPTIONAL — shown as a small metadata tag
 */
export interface Project {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  link?: string;
  year?: string;
}

export const projects: Project[] = [
  {
    id: 'automotive-motion',
    name: 'Automotive Motion',
    type: 'Web Design',
    description: 'A kinetic landing experience exploring speed through scroll-driven motion.',
    image:
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop',
    year: '2024',
    // link: 'https://example.com',
  },
  {
    id: 'urban-architecture',
    name: 'Urban Architecture',
    type: 'App Design',
    description: 'A mobile concept for documenting and mapping city architecture.',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    year: '2024',
  },
  {
    id: 'human-perspective',
    name: 'Human Perspective',
    type: 'Photography',
    description: 'A photo series on people and the spaces they move through.',
    image:
      'https://images.unsplash.com/photo-1551524164-687a5acf39ed?q=80&w=2071&auto=format&fit=crop',
    year: '2023',
  },
  {
    id: 'brand-identity',
    name: 'Brand Identity',
    type: 'Branding',
    description: 'A complete visual identity system, from logo to motion guidelines.',
    image:
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2194&auto=format&fit=crop',
    year: '2023',
  },
  {
    id: 'digital-synthesizer',
    name: 'Digital Synthesizer',
    type: 'UI/UX',
    description: 'An interactive web synth blending sound design with playful UI.',
    image:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop',
    year: '2024',
  },
  {
    id: 'spatial-computing',
    name: 'Spatial Computing',
    type: 'Concept',
    description: 'A speculative interface for working in three-dimensional space.',
    image:
      'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2070&auto=format&fit=crop',
    year: '2025',
  },
  {
    id: 'typography-system',
    name: 'Typography System',
    type: 'Typography',
    description: 'A modular type scale and component library for editorial layouts.',
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
    year: '2023',
  },
  {
    id: 'minimal-commerce',
    name: 'Minimal Commerce',
    type: 'E-Commerce',
    description: 'A pared-back storefront focused on product and typography.',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
    year: '2024',
  },
];
