import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { projects } from '../data/projects';

const SITE_URL = 'https://aahishabbani.me';
const SITE_NAME = 'Aahish Abbani';
const DEFAULT_IMAGE = `${SITE_URL}/black-hole.jpg`;
const DEFAULT_TITLE = 'Aahish Abbani | Student Founder, Developer, App Builder, and AI Projects';
const DEFAULT_DESCRIPTION =
  'Aahish Abbani is a student founder and developer who enjoys building apps, websites, AI tools, and hardware projects. Explore projects like Om Daily, TapLock, and more.';
const DEFAULT_SOCIAL_DESCRIPTION =
  'Student founder and developer building apps, websites, AI tools, and hardware projects.';

type RouteMetadata = {
  title: string;
  description: string;
  socialTitle?: string;
  socialDescription?: string;
  path: string;
  image?: string;
  type?: string;
};

function absoluteUrl(path: string) {
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function canonicalPath(pathname: string) {
  if (pathname === '/') return '/';
  return pathname.replace(/\/+$/, '');
}

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function setCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = url;
}

function routeMetadata(pathname: string): RouteMetadata {
  const path = canonicalPath(pathname);
  const projectMatch = path.match(/^\/projects\/([^/]+)$/);

  if (projectMatch) {
    const project = projects.find((item) => item.id === decodeURIComponent(projectMatch[1]));
    if (project) {
      return {
        title: `${project.name} | Aahish Abbani`,
        description: project.description,
        socialTitle: `${project.name} by Aahish Abbani`,
        path,
        image: project.image ? absoluteUrl(project.image) : DEFAULT_IMAGE,
      };
    }
  }

  switch (path) {
    case '/':
      return {
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        socialTitle: 'Aahish Abbani | Student Founder and Developer',
        socialDescription: DEFAULT_SOCIAL_DESCRIPTION,
        path: '/',
      };
    case '/about':
      return {
        title: 'About Aahish Abbani | Student Founder and Developer',
        description:
          'Learn more about Aahish Abbani, a student founder and developer in Massachusetts who builds apps, websites, AI tools, and creative technology projects.',
        socialTitle: 'About Aahish Abbani',
        path,
      };
    case '/projects':
      return {
        title: 'Projects | Aahish Abbani',
        description:
          'Explore apps, websites, AI tools, and technical projects by Aahish Abbani, including Om Daily, TapLock, Khet, Medora, and more.',
        socialTitle: 'Projects by Aahish Abbani',
        path,
      };
    case '/contact':
      return {
        title: 'Contact Aahish Abbani',
        description:
          'Contact Aahish Abbani for projects, collaborations, app ideas, AI tools, websites, and student founder work.',
        socialTitle: 'Contact Aahish Abbani',
        path,
      };
    default:
      return {
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        socialTitle: 'Aahish Abbani | Student Founder and Developer',
        socialDescription: DEFAULT_SOCIAL_DESCRIPTION,
        path,
      };
  }
}

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = routeMetadata(pathname);
    const canonical = absoluteUrl(metadata.path);
    const image = metadata.image ?? DEFAULT_IMAGE;
    const socialTitle = metadata.socialTitle ?? metadata.title;
    const socialDescription = metadata.socialDescription ?? metadata.description;

    document.title = metadata.title;
    setCanonical(canonical);
    setMeta('meta[name="description"]', 'name', 'description', metadata.description);
    setMeta('meta[name="author"]', 'name', 'author', SITE_NAME);
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME);
    setMeta('meta[property="og:title"]', 'property', 'og:title', socialTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', socialDescription);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    setMeta('meta[property="og:type"]', 'property', 'og:type', metadata.type ?? 'website');
    setMeta('meta[property="og:image"]', 'property', 'og:image', image);
    setMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', `${socialTitle} preview`);
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', socialTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', socialDescription);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image);
  }, [pathname]);

  return null;
}
