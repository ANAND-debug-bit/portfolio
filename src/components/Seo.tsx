import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { projects } from '../data/projects';

const SITE_URL = 'https://aahishabbani.me';
const SITE_NAME = 'Atharv Anand';
const DEFAULT_IMAGE = `${SITE_URL}/black-hole.jpg`;
const DEFAULT_TITLE = 'Atharv Anand';
const DEFAULT_DESCRIPTION =
  'Atharv Anand builds apps, websites, AI tools, and hardware projects. Explore projects like Om Daily, TapLock, and more.';
const DEFAULT_SOCIAL_DESCRIPTION =
  'Apps, websites, AI tools, and hardware projects by Atharv Anand.';

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
        title: `${project.name} | Atharv Anand`,
        description: project.description,
        socialTitle: `${project.name} by Atharv Anand`,
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
        socialTitle: 'Atharv Anand',
        socialDescription: DEFAULT_SOCIAL_DESCRIPTION,
        path: '/',
      };
    case '/about':
      return {
        title: 'About Atharv Anand',
        description:
          'Learn more about Atharv Anand and the apps, websites, AI tools, and creative technology projects he builds.',
        socialTitle: 'About Atharv Anand',
        path,
      };
    case '/projects':
      return {
        title: 'Projects | Atharv Anand',
        description:
          'Explore apps, websites, AI tools, and technical projects by Atharv Anand, including Om Daily, TapLock, Khet, Medora, and more.',
        socialTitle: 'Projects by Atharv Anand',
        path,
      };
    case '/contact':
      return {
        title: 'Contact Atharv Anand',
        description:
          'Contact Atharv Anand for projects, collaborations, app ideas, AI tools, and websites.',
        socialTitle: 'Contact Atharv Anand',
        path,
      };
    default:
      return {
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        socialTitle: 'Atharv Anand',
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
