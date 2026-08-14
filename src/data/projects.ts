/**
 * Project list — the single source of truth for the Projects page
 * (the Gallery, the Carousel, and the detail popup all read from here).
 *
 * To add a project, copy an entry and edit the fields:
 *   - name:        title shown big
 *   - type:        small label, e.g. "Web App", "iOS App"
 *   - description: one short line (shown on hover in the gallery,
 *                  and under the active slide in the carousel)
 *   - overview:    the longer paragraph shown in the popup
 *   - highlights:  OPTIONAL — bullet points shown in the popup
 *   - languages:   OPTIONAL — GitHub-style language composition shown in the popup
 *   - award:       OPTIONAL — shown as a ribbon in the popup
 *   - tags:        OPTIONAL — small pills (tech / platform / focus)
 *   - image:       OPTIONAL — cover photo. Drop a file in /public/projects
 *                  and set e.g. '/projects/kastrals.jpg'. If omitted, a
 *                  branded placeholder cover is generated automatically.
 *   - gallery:     OPTIONAL — extra photos shown in the popup (add later).
 *   - link:        OPTIONAL — live site / store listing.
 *   - year:        OPTIONAL — shown as a small metadata tag.
 */
export interface Project {
  id: string;
  name: string;
  type: string;
  description: string;
  overview: string;
  highlights?: string[];
  languages?: ProjectLanguage[];
  award?: string;
  tags?: string[];
  image?: string;
  gallery?: string[];
  link?: string;
  year?: string;
}

export interface ProjectLanguage {
  name: string;
  value: number;
}

export const projects: Project[] = [
  {
    id: 'golden-ratio',
    name: 'Golden Ratio',
    type: 'Web App',
    description: 'Measure your face against the golden ratio with on-device computer vision.',
    overview:
      'Golden Ratio finds 68 facial landmarks in your browser, then runs six classical proportion checks against Φ (1.618…). Upload a photo or use your camera — everything runs locally, nothing is uploaded to a server.',
    highlights: [
      'On-device face detection and golden-ratio scoring',
      'Upload a photo or capture one with your camera',
      'Explains six proportion ratios with construction-line overlays',
      'Privacy-first: all processing happens in the browser',
    ],
    tags: ['Web App', 'Computer Vision', 'JavaScript'],
    image: '/projects/golden-ratio.jpg',
    link: 'https://golden-ratio-nu.vercel.app/',
    year: '2026',
  },
  {
    id: 'hackathon-simulator',
    name: 'Hackathon Simulator',
    type: 'Web Game',
    description: 'Build a team, pick a stack, and simulate your way through a hackathon.',
    overview:
      'Hackathon Simulator walks you through the full hackathon flow — assemble your team, roll a problem statement, choose your tech stack, pick a USP, and see how your choices play out. A fun way to practice hackathon decision-making before the real thing.',
    highlights: [
      'Build a team and assign roles',
      'Random problem statements with one reroll',
      'Frontend and backend stack selection',
      'Team voting on your unique selling proposition',
    ],
    tags: ['Web App', 'Simulation', 'Hackathon'],
    image: '/projects/hackathon-simulator.jpg',
    link: 'https://anand-debug-bit.github.io/Hackathon-Simulator/',
    year: '2026',
  },
  {
    id: 'phys-lab',
    name: 'Phys Lab',
    type: 'Education',
    description: 'A virtual physics laboratory with interactive high-school experiments.',
    overview:
      'Phys Lab is a virtual physics laboratory covering six major domains of high-school physics. Explore animated experiments — from pendulums and vernier calipers on the home screen to hands-on lab modules you can run in the browser.',
    highlights: [
      'Six major physics domains with multiple experiments each',
      'Animated home screen with sine waves, pendulum, and vernier caliper',
      'Interactive experiment cards you can launch from the lab',
      'Built for high-school physics learners',
    ],
    tags: ['Web App', 'Physics', 'Education'],
    image: '/projects/phys-lab.jpg',
    link: 'https://phys-lab-virtual-physics-laboratory.vercel.app/',
    year: '2026',
  },
  {
    id: 'vedic-calc',
    name: 'Vedic Calc',
    type: 'Education',
    description: 'Learn Vedic math techniques for all four basic operations.',
    overview:
      'Vedic Calc teaches ancient Vedic mathematics through beautifully designed learning cards for addition, subtraction, multiplication, and division. Work through four methods per operation, then test yourself across five practice levels.',
    highlights: [
      'Four algebra operations with four methods each',
      'Mandala-inspired home page with rotating art',
      'Structured learning cards before practice mode',
      'Five difficulty levels from Level 1 to Level 5',
    ],
    tags: ['Web App', 'Vedic Math', 'Education'],
    image: '/projects/vedic-calc.jpg',
    link: 'https://vedic-calc.vercel.app/',
    year: '2026',
  },
  {
    id: 'poke-pull',
    name: 'Poke Pull',
    type: 'Web Game',
    description: 'A two-player Pokémon card pull game with scoring and round tracking.',
    overview:
      'Poke Pull is a local two-player game where friends take turns rolling for Pokémon cards on one device. Each card type carries a point value, rounds are tracked automatically, and a final scoreboard declares the winner after three rounds.',
    highlights: [
      'Two-player local multiplayer on one device',
      'Roll for cards with type-based point values',
      'Running score, round counter, and pull log per player',
      'Final scoreboard and winner declaration',
    ],
    tags: ['Web App', 'Pokémon', 'Multiplayer'],
    image: '/projects/poke-pull.jpg',
    link: 'https://poke-pull.vercel.app/',
    year: '2026',
  },
];

/**
 * Resolve a project's cover image. Uses the real photo when provided,
 * otherwise generates a branded placeholder cover (dark gradient + the
 * project name) so the grid never shows a broken image while photos are
 * still being added.
 */
export function projectImageSrc(project: Project): string {
  if (project.image) return project.image;

  const label = project.name.replace(/&/g, 'and');
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'>
  <defs>
    <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='#161e27'/>
      <stop offset='1' stop-color='#0a0d12'/>
    </linearGradient>
    <linearGradient id='ink' x1='0' y1='0' x2='1' y2='0'>
      <stop offset='0' stop-color='#89AACC'/>
      <stop offset='1' stop-color='#4E85BF'/>
    </linearGradient>
  </defs>
  <rect width='800' height='1000' fill='url(#bg)'/>
  <circle cx='640' cy='240' r='260' fill='url(#ink)' opacity='0.10'/>
  <text x='56' y='900' font-family='Georgia, Instrument Serif, serif' font-style='italic' font-size='66' fill='url(#ink)'>${label}</text>
  <text x='58' y='950' font-family='Arial, sans-serif' font-size='20' letter-spacing='6' fill='#6b7686'>${project.type.toUpperCase()}</text>
</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
