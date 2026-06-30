# Aahish's Portfolio Website

Welcome to my portfolio! This is a modern, animated portfolio website showcasing my projects, work, and explorations in web development and technology. It's built with cutting-edge web technologies and packed with smooth animations and interactive elements that make browsing through my work actualyl enjoyable.trust me its really tuff!

## About This Project

This portfolio website is a personal project I built to showcase my work as a sophomore at Shrewsbury High School who's passionate about coding, technology, and building cool stuff on the internet. When I'm not working as an assistant tutor at Kumon Shrewsbury, I'm usually tinkering with code, listening to music, or thinking about my next big project idea.

The whole site is designed to be responsive, fast, and filled with delightful interations that make it stand out from your typical portfolio template. I wanted something that felt personal and reflected my personality—something more than just a static list of projects.

## What's Inside

### Pages & Sections

- **Home Page**: The landing page features a hero section with an animated introduction, selected works carousel, explorations, a text flipping board, and a contact section with video background
- **About Page**: A deep dive into who I am, featuring an animated intro text that reveals as you scroll, a timeline of my experiences, travel section showcasing places I've visited, and more personal details
- **Projects Page**: A showcase of my work with detailed project cards
- **Project Details**: Individual pages for each project with in-depth information, images, and descriptions
- **Contact Page**: Multiple ways to get in touch, including a contact form and social links

### Key Features

**Smooth Scrolling & Animations**
- Integrated Lenis library for buttery-smooth scroll experience
- GSAP ScrollTrigger for scroll-based animations that trigger at just the right moment
- Framer Motion for component-level animation magic
- Scroll-triggered character animations that bring text to life

**Interactive Components**
- Magnetic cards that respond to your cursor (it's more fun than it sounds)
- Project carousels with smooth transitions
- Diagonal carousel for a unique browsing experience
- Infinite sliders for content showcases
- Text flipping board with animated transitions
- Travel section with beautiful image galleries

**Design & Theming**
- Dark and light theme support with smooth transitions
- Custom theme context for global theme management
- Tailwind CSS for rapid, responsive design
- Beautiful gradient overlays and glassmorphism effects
- Carefully crafted color palette thats easy on the eyes

**Performance & UX**
- Loading screen that sets the mood when you first visit
- Smooth scroll position reset between route changes
- Responsive design that works on all devices (mobile, tablet, desktop)
- TypeScript for type-safe code and fewer runtime errors
- Vite for lightning-fast development and builds

### Technical Stack

**Frontend Framework**
- React 19.2.7 - The latest and greatest version for building UIs
- TypeScript 6.0.2 - Static typing to catch bugs before they happen
- Vite 8.1.0 - Super fast build tool and dev server

**Animation & Interactivity**
- Framer Motion 12.42.0 - Component-level animations and transitions
- GSAP 3.15.0 - Professional-grade animation library with ScrollTrigger
- Lenis 1.3.24 - Smooth scroll experience library

**UI & Styling**
- Tailwind CSS 4.3.1 - Utility-first CSS framework for fast development
- Tailwind CSS Animate - Animation utilities for Tailwind
- lucide-react - Beautiful, consisitent icon library
- react-icons - Additional icon sets for variety

**Routing & Media**
- React Router DOM 7.18.0 - Client-side routing for navigation
- Swiper 14.0.0 - Touch slider library for carousels
- HLS.js 1.6.16 - HTTP Live Streaming support for video playback

**Code Quality**
- Oxlint 1.69.0 - Fast, modern linter for catching issues
- TypeScript compiler - Compile-time type checking

## Getting Started

### Installation

1. Clone the repository and install dependancies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create an optimized production build:
```bash
npm run build
```

Then preview it locally:
```bash
npm run preview
```

## Project Structure

```
src/
├── pages/              # Page components for each route
│   ├── Home.tsx       # Landing page with hero and featured work
│   ├── About.tsx      # About me page with timeline and travel
│   ├── Projects.tsx   # Projects listing page
│   ├── ProjectDetail.tsx # Individual project details
│   └── Contact.tsx    # Contact page
├── components/         # Reusable UI components
│   ├── Hero.tsx       # Hero section with animated intro
│   ├── Navbar.tsx     # Navigation bar
│   ├── Footer.tsx     # Footer section
│   ├── MagneticCard.tsx # Interactive magnetic card effect
│   ├── ProjectsCarousel.tsx # Project showcase carousel
│   ├── TravelSection.tsx    # Travel experiences section
│   ├── Explorations.tsx     # Explorations showcase
│   ├── TextFlippingBoardDemo.tsx # Animated text board
│   ├── Contact.tsx    # Contact section with video
│   ├── LoadingScreen.tsx # Initial loading animation
│   ├── Journal.tsx    # Journal entries
│   ├── Stats.tsx      # Statistics display
│   ├── DiagonalCarousel.tsx # Diagonal-scrolling carousel
│   ├── ThemeToggle.tsx # Dark/light theme switcher
│   └── core/          # Core animation components
├── context/           # React context for global state
│   └── ThemeProvider.tsx # Theme management
├── App.tsx           # Main app component with routing
└── main.tsx          # Entry point

```

## How It Works

### Smooth Scrolling

The portfolio uses Lenis for smooth scrolling and GSAP's ScrollTrigger for scroll-based animations. When you navigate between pages, the scroll position resets cleanly thanks to a custom ScrollToTop component that manages this transition. This ensures the experience feels polished wheather you're clicking around or using the back button.

### Animations on Scroll

Many elements animate as you scroll past them—text fades in character by character, cards scale and fade, and other elements come to life at exactly the right moment. This is powered by Framer Motion's `useScroll` hook combined with GSAP for more complex sequences.

### Theme System

The theme provider manages dark and light modes globally. Components access the current theme through context, making it easy to support both themes throughout the site. The theme toggle switches instantly with smooth transitions.

### Responsive Design

Everything is built mobile-first using Tailwind CSS breakpoints. The layout adapts gracefully from small phones all the way up to large desktop displays. Animations are performance-optimized so they run smoothly even on older devices.

## Scripts

- `npm run dev` - Start the development server with hot module reloading
- `npm run build` - Build for production with TypeScript checking
- `npm run lint` - Run Oxlint to check for code issues
- `npm run preview` - Preview the production build locally

## What I Learned

Building this portfolio from scratch taught me a ton about:
- Advanced React patterns like custom hooks and context
- Performance optimization for animations and scroll events
- Responsive design that actually works across all devices
- How to structure a larger project with multiple pages and components
- Working with complex libraries like GSAP and Framer Motion
- The importance of smooth UX and attention to detail

## Future Plans

I'm always thinking about ways to improve this portfolio:
- Adding more interactive projects and case studies
- Implementing dark mode animations
- Adding a blog section for sharing thoughts and learnings
- Performance optimizations to get even faster load times
- More creative animations and scroll effects

## Credits

I, Aahish, wrote most of the code for this portfolio, including all the component logic, routing, animations setup, and overall architecture. I used AI to generate parts of the UI components and styling, which helped me move faster on the visual design side while I focused on the more complex interactivity and animation logic.

## Contact

Want to reach out? Head over to the [Contact page](/) to get in touch. I'm always interested in connecting with other developers, learning new things, and collaborating on cool projects.

---

Built with ❤️ by Aahish Abbani
