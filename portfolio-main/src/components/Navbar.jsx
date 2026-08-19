import { motion, AnimatePresence } from 'motion/react';
import { ThemeContext } from '../contexts/ThemeContext';
import { useContext, useState, useEffect, useCallback } from 'react';
import { Code2, Monitor, Briefcase, Mail, Moon, Sun } from 'lucide-react';
import { HomeIcon, UserIcon } from './icons.jsx';
import Logo from './Logo';

/**
 * Single source of truth for nav destinations. Shared between the desktop
 * floating pill, the mobile top bar and the mobile bottom tab bar so all
 * three stay in sync automatically.
 */
const NAV_ITEMS = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'about', label: 'About', Icon: UserIcon },
  { id: 'skills', label: 'Tech Stack', Icon: Code2 },
  { id: 'projects', label: 'Projects', Icon: Monitor },
  { id: 'experience', label: 'Experience', Icon: Briefcase },
  { id: 'contact', label: 'Contact', Icon: Mail },
];

function ThemeToggleButton({ theme, toggleTheme, size = 'md' }) {
  const dim = size === 'sm' ? 'h-8 w-8' : 'h-9 w-9';
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`flex ${dim} flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300`}
      style={{ backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center"
          >
            <Sun className="w-4 h-4" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center"
          >
            <Moon className="w-4 h-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('home');

  // Scroll state: only used to shrink/darken the pill past 20px. The
  // navbar itself always stays floating and visible — it never hides,
  // regardless of scroll direction.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-spy: highlight whichever section currently owns the vertical
  // midpoint of the viewport.
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      {/* ── Desktop: floating glass pill, top-center ───────────────────── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 items-center rounded-full border backdrop-blur-xl"
        style={{
          borderColor: 'var(--color-border)',
          backgroundColor: scrolled ? 'var(--color-nav-bg-scrolled)' : 'var(--color-nav-bg)',
          padding: scrolled ? '0.375rem 0.5rem' : '0.5rem 0.625rem',
          boxShadow: scrolled ? '0 10px 30px -8px rgba(0,0,0,0.25)' : 'none',
          gap: '0.25rem',
          transition: 'padding 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
        }}
        aria-label="Primary"
      >
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105"
          style={{ backgroundColor: 'var(--color-accent)' }}
          aria-label="Madhava Prasad — home"
        >
          <Logo className="h-4 w-4" color="#ffffff" strokeWidth={20} />
        </a>

        <div className="flex items-center mx-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200"
                style={{ color: isActive ? '#ffffff' : 'var(--color-text)' }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </a>
            );
          })}
        </div>

        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} size={scrolled ? 'sm' : 'md'} />
      </motion.nav>

      {/* ── Mobile: slim top bar with logo + theme toggle only ─────────── */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex md:hidden fixed top-0 left-0 w-full z-50 items-center justify-between px-4 py-3 backdrop-blur-xl"
        style={{
          backgroundColor: scrolled ? 'var(--color-nav-bg-scrolled)' : 'var(--color-nav-bg)',
          borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'transparent'}`,
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center gap-2.5"
          aria-label="Madhava Prasad — home"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            <Logo className="h-4 w-4" color="#ffffff" strokeWidth={20} />
          </span>
          <span className="text-sm font-semibold tracking-tight" style={{ color: 'var(--color-text)' }}>
            Madhava Prasad
          </span>
        </a>
        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} size="sm" />
      </motion.div>

      {/* ── Mobile: floating iOS-style bottom tab bar ───────────────────── */}
      <nav
        className="flex md:hidden fixed bottom-0 left-0 w-full z-50 justify-center px-4"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 1rem)' }}
        aria-label="Primary"
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-0.5 rounded-full border backdrop-blur-xl px-1.5 py-1.5 shadow-2xl"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-nav-bg-scrolled)' }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                whileTap={{ scale: 0.86 }}
                className="relative flex flex-col items-center justify-center gap-0.5 rounded-full px-3.5 py-2 min-w-[2.75rem]"
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill-mobile"
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{ backgroundColor: 'var(--color-accent-soft)' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <item.Icon
                  size={19}
                  strokeWidth={isActive ? 2.4 : 2}
                  style={{ color: isActive ? 'var(--color-accent)' : 'var(--color-muted)' }}
                />
              </motion.a>
            );
          })}
        </motion.div>
      </nav>
    </>
  );
}

export default Navbar;
