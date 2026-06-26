import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  /**
   * Flip the theme with the signature expanding-circle reveal.
   * @param origin screen coordinates the circle blooms out of (the toggle button).
   */
  toggleTheme: (origin?: { x: number; y: number }) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialTheme(): Theme {
  // The inline script in index.html has already set data-theme; mirror it.
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return 'dark';
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

const DURATION = 650;
const EASING = 'cubic-bezier(0.76, 0, 0.24, 1)';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const animating = useRef(false);

  // Keep <html> + storage in sync whenever the theme changes.
  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      if (animating.current) return;
      const next: Theme = theme === 'dark' ? 'light' : 'dark';

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const x = origin?.x ?? window.innerWidth;
      const y = origin?.y ?? 0;
      // Radius needed to cover the farthest corner from the origin.
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      // Reduced motion or no fancy support → instant flip.
      const supportsVT =
        typeof (document as any).startViewTransition === 'function' && !prefersReduced;

      if (prefersReduced) {
        setTheme(next);
        return;
      }

      if (supportsVT) {
        animating.current = true;
        const transition = (document as any).startViewTransition(() => {
          // Commit synchronously so the new snapshot is the next theme.
          applyTheme(next);
          setTheme(next);
        });
        transition.ready
          .then(() => {
            document.documentElement.animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${endRadius}px at ${x}px ${y}px)`,
                ],
              },
              {
                duration: DURATION,
                easing: EASING,
                pseudoElement: '::view-transition-new(root)',
              },
            );
          })
          .catch(() => {});
        transition.finished.finally(() => {
          animating.current = false;
        });
        return;
      }

      // Fallback: paint an overlay with the incoming background and grow a
      // circle out of the origin, then commit the theme underneath it.
      runOverlayReveal(next, x, y, endRadius, () => setTheme(next), animating);
    },
    [theme],
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

function runOverlayReveal(
  next: Theme,
  x: number,
  y: number,
  endRadius: number,
  commit: () => void,
  animating: React.MutableRefObject<boolean>,
) {
  animating.current = true;
  const overlay = document.createElement('div');
  overlay.className = 'theme-reveal-overlay';
  // Read the incoming theme's background straight from the palette.
  const probe = document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute('data-theme', next);
  overlay.style.background = getComputedStyle(document.documentElement)
    .getPropertyValue('--bg')
    .trim();
  document.documentElement.setAttribute('data-theme', probe ?? 'dark');

  document.body.appendChild(overlay);

  const anim = overlay.animate(
    {
      clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
    },
    { duration: DURATION, easing: EASING },
  );

  anim.finished
    .then(() => {
      commit(); // page now matches the overlay; removal is seamless.
    })
    .finally(() => {
      overlay.remove();
      animating.current = false;
    });
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
