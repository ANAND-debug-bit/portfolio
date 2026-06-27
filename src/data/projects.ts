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
  award?: string;
  tags?: string[];
  image?: string;
  gallery?: string[];
  link?: string;
  year?: string;
}

export const projects: Project[] = [
  {
    id: 'kastrals',
    name: 'Kastrals',
    type: 'Business Intelligence',
    description: 'Market intelligence and revenue forecasting built for local businesses.',
    overview:
      "Kastrals helps local businesses stay a step ahead of their market. It analyzes trends, surfaces nearby concerts and events worth marketing around, and predicts future revenue using competitor data, weather, and trend signals. From there it builds a simple checklist so an owner always knows the next move and never falls behind.",
    highlights: [
      'Tracks market trends and finds nearby events to market around',
      'Forecasts future revenue from competitor, weather, and trend data',
      'Turns every prediction into a clear, do-this-next checklist',
    ],
    award: '1st Place, Divergent Teams Microsoft Hackathon',
    tags: ['Web App', 'Forecasting', 'Local Business'],
    image: '/projects/kastrals-1.png',
    gallery: [
      '/projects/kastrals-2.png',
      '/projects/kastrals-3.png',
      '/projects/kastrals-4.png',
    ],
    link: 'https://kastrals.vercel.app/',
    year: 'Mar 2026',
  },
  {
    id: 'haven',
    name: 'Haven',
    type: 'Safety Platform',
    description: 'A safety and roadmap platform that builds personalized plans for the people who need them most.',
    overview:
      "Haven helps people create personalized plans to improve their situation. It combines AI, neural networks, and Monte Carlo simulations that run 10,000 times to generate tailored roadmaps for very different users, from people experiencing homelessness to small business owners. It also includes emergency safety features that point users to the nearest shelters when they need them.",
    highlights: [
      'Generates roadmaps with neural networks and 10,000-run Monte Carlo simulations',
      'Built for distinct users, from people experiencing homelessness to small business owners',
      'Emergency features locate the nearest shelters during a crisis',
      'Validated through 5 target-user interviews and 5 users on launch day',
    ],
    award: 'Best Technical Award, Boston University High School Hackathon',
    tags: ['Web App', 'Neural Networks', 'Social Impact'],
    image: '/projects/haven-1.png',
    gallery: ['/projects/haven-2.png', '/projects/haven-3.png'],
    link: 'https://buhhs.vercel.app/',
    year: 'Apr 2026',
  },
  {
    id: 'khet',
    name: 'Khet',
    type: 'AgriTech',
    description: 'Satellite-powered crop health insights for small and medium farmers.',
    overview:
      "Khet is a crop-health platform for small and medium-sized farmers. It uses Sentinel-2 satellite data and NDVI, the Normalized Difference Vegetation Index, to reveal crop health, biomass, drought stress, pest damage, and nutrient issues long before they are visible to the naked eye. A built-in AI assistant explains the farm's condition in plain language and suggests what to do next.",
    highlights: [
      'Reads Sentinel-2 satellite data and NDVI to catch problems early',
      'Detects drought stress, pest damage, biomass, and nutrient issues',
      'Farmers search or draw their farm on the map, then get data tailored to it via GeoJSON',
      'AI assistant explains conditions and recommends next steps',
    ],
    tags: ['Web App', 'Satellite Data', 'AI Assistant'],
    image: '/projects/khet.png',
    link: 'https://khets.vercel.app/',
    year: 'Jun 2026',
  },
  {
    id: 'flow',
    name: 'Flow',
    type: 'macOS App',
    description: 'Surfaces the messages that actually matter inside noisy group chats.',
    overview:
      "Flow is a macOS productivity app that helps you find the important messages buried in overwhelming group chats. Teenagers can get hundreds of notifications a day, with real updates lost under memes, side conversations, and random chatter. Flow detects what matters, pulls it into the app, and can even schedule events straight from a conversation. If a group chat locks in tomorrow's plan while you are asleep, Flow summarizes it and adds it to your calendar.",
    highlights: [
      'Detects important messages and gathers them in one place',
      'Summarizes plans and adds events directly to your calendar',
      'Works with iMessage and Slack channels',
    ],
    tags: ['macOS', 'Productivity', 'iMessage + Slack'],
    year: 'Apr 2026',
  },
  {
    id: 'can-i-eat-this',
    name: 'Can I Eat This?',
    type: 'Mobile App',
    description: 'Scan a label and instantly know whether a food is safe for you.',
    overview:
      "Can I Eat This? helps people check whether a product is safe to eat based on their allergies and dietary restrictions. You enter your allergies or restrictions once, then scan a food label to see if it is safe. I built it because so many people accidentally eat foods containing allergens, and checking labels by hand is hard and easy to get wrong.",
    highlights: [
      'Scan a food label to instantly check it against your profile',
      'Handles allergies and dietary restrictions in one place',
      'Supports broad restrictions like vegetarian and vegan',
      'Also covers specific ones like Jain and halal',
    ],
    tags: ['Mobile', 'Health', 'Label Scanning'],
    year: 'Feb 2026',
  },
  {
    id: 'om-daily',
    name: 'Om Daily',
    type: 'Mobile App',
    description: 'Daily Hinduism lessons that feel like a game, kind of like Duolingo but for dharma.',
    overview:
      "Om Daily teaches people about Hinduism through small daily lessons, kind of like Duolingo but for dharma instead of languages. It started as a website with daily quotes from the Bhagavad Gita. You move through different paths like the Lotus Path or the Mountain Path, learning prayers, stories, and festival traditions as you go, and you earn Dharma Coins along the way for completing lessons. It is built to make learning your faith feel like a game instead of a chore.",
    highlights: [
      'Small daily lessons, kind of like Duolingo but for dharma',
      'Move through paths like the Lotus Path and the Mountain Path',
      'Learn prayers, stories, and festival traditions as you go',
      'Earn Dharma Coins for completing lessons',
      'Started as a website with daily Bhagavad Gita quotes, now a mobile app',
    ],
    tags: ['Mobile', 'Hinduism', 'Gamified'],
    image: '/projects/om-daily/1.png',
    gallery: [
      '/projects/om-daily/4.png',
      '/projects/om-daily/6.png',
      '/projects/om-daily/2.png',
      '/projects/om-daily/8.png',
      '/projects/om-daily/3.png',
      '/projects/om-daily/5.png',
      '/projects/om-daily/9.png',
      '/projects/om-daily/10.png',
      '/projects/om-daily/7.png',
    ],
    link: 'https://apps.apple.com/app/om-daily/id6778643150',
    year: 'Feb to Jun 2026',
  },
  {
    id: 'medora',
    name: 'Medora',
    type: 'iOS App',
    description: "Turns doctors' notes into a clear plan for people managing chronic disease.",
    overview:
      "Medora is built for people living with chronic disease. It takes in doctors' papers and summarizes them, then turns that summary into a checklist users can actually follow. Along the way they log any symptoms they have been having, and at the end of their cycle a dedicated AI summarizes the past month. It connects with Apple HealthKit and was built in Swift.",
    highlights: [
      "Summarizes doctors' papers into plain language",
      'Builds a follow-along checklist from each visit',
      'Log symptoms and get an AI summary at the end of every cycle',
      'Built with Swift and integrates Apple HealthKit',
    ],
    tags: ['iOS', 'Swift', 'Apple HealthKit'],
    image: '/projects/medora.png',
    year: 'Jun 2026',
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
