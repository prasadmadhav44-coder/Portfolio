import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

import { tsParticles } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

import Navbar from './components/Navbar';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import AboutMe from './components/AboutMe.jsx';
import TechStack from './components/TechStack.jsx';
import Education from './components/Education.jsx';
import Certifications from './components/Certifications.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import SplashLoader from './components/SplashLoader';
import CustomCursor from './components/CustomCursor.jsx';

import AnalyticsTracker from './components/AnalyticsTracker.jsx';
import { Analytics } from '@vercel/analytics/react';
import { useTheme } from './contexts/ThemeContext';

function PortfolioHome() {
  const { theme } = useTheme();
  const [splashDone, setSplashDone] = useState(false);

  const particlesContainerRef = useRef(null);

  // Stable callback reference
  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  const particlesOptions = useMemo(() => {
    // Fewer particles on small screens: same premium effect, lighter draw
    // cost on lower-powered mobile GPUs/battery.
    const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 768;
    const particleCount = isSmallScreen ? 32 : 70;

    return {
      background: {
        color: theme === 'dark' ? '#000000' : '#ffffff',
      },

      fpsLimit: 60,

      particles: {
        number: {
          value: particleCount,
          density: {
            enable: true,
            value_area: 800,
          },
        },

        // Neutral particle color — the accent is reserved for the
        // hover-linked lines so it reads as an intentional highlight,
        // not a wash of brand color across the whole background.
        color: {
          value: theme === 'dark' ? '#ffffff' : '#111111',
        },

        shape: {
          type: 'circle',
        },

        opacity: {
          value: {
            min: 0.2,
            max: 0.45,
          },

          random: true,

          anim: {
            enable: true,
            speed: 0.5,
            opacity_min: 0.08,
            sync: false,
          },
        },

        size: {
          value: {
            min: 2,
            max: 2.6,
          },

          random: true,

          anim: {
            enable: true,
            speed: 2,
            size_min: 1,
            sync: false,
          },
        },

        links: {
          enable: true,
          distance: 180,
          color: '#b30047',
          opacity: 0.18,
          width: 1,
        },

        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
        },
      },

      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'grab',
          },

          onClick: {
            enable: false,
          },

          resize: {
            enable: true,
          },
        },

        modes: {
          grab: {
            distance: 150,

            line_linked: {
              opacity: 0.35,
              color: '#b30047',
            },
          },
        },
      },

      detectRetina: true,
    };
  }, [theme]);

  useEffect(() => {
    // Gate particles until splash completes
    if (!splashDone) return;

    const initParticles = async () => {
      if (!particlesContainerRef.current) return;

      try {
        await loadSlim(tsParticles);

        await tsParticles.load({
          id: 'tsparticles',
          element: particlesContainerRef.current,
          options: particlesOptions,
        });
      } catch (error) {
        console.error('tsParticles failed:', error);
      }
    };

    initParticles();

    return () => {
      const container = tsParticles.dom().find((c) => c.id === 'tsparticles');

      container?.destroy();
    };
  }, [particlesOptions, splashDone]);

  return (
    <div className="relative min-h-screen w-full bg-transparent">
      {/* Splash mounts FIRST and gates everything */}
      {!splashDone && <SplashLoader onAnimationComplete={handleSplashComplete} />}

      {/* Heavy subtree mounts ONLY after splash */}
      {splashDone && (
        <>
          <div
            id="tsparticles"
            ref={particlesContainerRef}
            className="absolute inset-0 w-full h-full particles-canvas"
            style={{
              minHeight: '100vh',
              zIndex: -10,
            }}
          />

          <Analytics />
          <AnalyticsTracker />
          <CustomCursor />

          <Navbar />
          <main>
            <Hero />
            <AboutMe />
            <TechStack />
            <Projects />
            <Experience />
            <Education />
            <Certifications />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default PortfolioHome;
