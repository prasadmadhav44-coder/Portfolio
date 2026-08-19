import { motion } from 'motion/react';
import { useMemo } from 'react';
import ReactGA from 'react-ga4';
import { FileText, Mail, Github, Linkedin } from 'lucide-react';

function Hero() {
  const handleResume = () => {
    ReactGA.event({
      category: 'Resume',
      action: 'View',
      label: 'Resume PDF',
    });

    window.open('/Madhava_Prasad_Resume.pdf', '_blank', 'noopener,noreferrer');
  };

  const handleContactScroll = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // Split into words first, then letters within each word. Each word is
  // wrapped in its own `whitespace-nowrap` span so the browser can only
  // ever break the line *between* words — never mid-word — no matter how
  // narrow the viewport is. (Per-letter inline-block spans placed directly
  // in one flat list, as before, let the browser insert a break between
  // any two letters since each is its own atomic inline box — that's what
  // produced the "Madhava Pr / asad" split on mobile.)
  const nameWords = useMemo(() => 'Madhava Prasad'.split(' '), []);
  let letterIndex = 0;

  return (
    <section
      id="home"
      className="hero min-h-[100dvh] flex items-center justify-center px-6 py-20 relative overflow-hidden bg-transparent"
    >
      {/* Ambient background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], x: [0, 80, 0], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-[0.12]"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, -60, 0], y: [0, 60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-[0.1]"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center relative z-10 max-w-5xl mx-auto"
      >
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-lg mb-6 font-medium tracking-wide"
          style={{ color: 'var(--color-muted)' }}
        >
          Hello! I'm
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative inline-block group/name mb-8 cursor-default"
        >
          <span
            className="inline-flex flex-wrap items-baseline justify-center gap-x-3 sm:gap-x-4 md:gap-x-5 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]"
            style={{ color: 'var(--color-text)' }}
          >
            {nameWords.map((word) => (
              <span key={word} className="inline-block whitespace-nowrap">
                {word.split('').map((char, i) => {
                  const delay = 0.4 + letterIndex * 0.02;
                  letterIndex += 1;
                  return (
                    <motion.span
                      key={`${word}-${char}-${i}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay, duration: 0.3 }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </span>

          <motion.div
            className="absolute -bottom-2 left-1/2 h-1 rounded-full"
            style={{ backgroundColor: 'var(--color-accent)', transformOrigin: 'center' }}
            initial={{ width: 0, x: 0 }}
            whileHover={{
              width: '100%',
              x: '-50%',
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            }}
          />
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 font-light leading-relaxed"
          style={{ color: 'var(--color-muted)' }}
        >
          Software Engineer &bull; AI Agent Developer &bull; Full Stack Developer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm sm:text-base md:text-lg mb-10 max-w-2xl mx-auto"
          style={{ color: 'var(--color-muted)' }}
        >
          Building multi-agent LLM systems, REST APIs, and full-stack products with
          Python, React and Node.js.
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="h-1 w-48 mx-auto rounded-full mb-12"
          style={{ backgroundColor: 'var(--color-accent)', opacity: 0.5 }}
        />

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          {/* Primary CTA */}
          <motion.button
            onClick={handleResume}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="group relative px-8 py-4 rounded-2xl font-semibold text-base md:text-lg transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl"
            style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff' }}
            aria-label="View Resume (opens PDF in a new tab)"
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background:
                  'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
            />
            <span className="relative z-10 flex items-center gap-2.5">
              <FileText size={20} className="flex-shrink-0" />
              View Resume
            </span>
          </motion.button>

          {/* Secondary CTA */}
          <motion.a
            href="#contact"
            onClick={handleContactScroll}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="group px-8 py-4 rounded-2xl font-semibold text-base md:text-lg transition-all duration-300 border-2"
            style={{ borderColor: 'var(--color-accent)', color: 'var(--color-text)' }}
            aria-label="Get In Touch"
          >
            <span className="flex items-center gap-2.5">
              <Mail size={20} className="flex-shrink-0" />
              Get In Touch
            </span>
          </motion.a>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <motion.a
              href="https://github.com/prasadmadhav44-coder"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-2xl border-2 transition-colors duration-300"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              aria-label="GitHub profile"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/madhavaprasadkg/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-2xl border-2 transition-colors duration-300"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              aria-label="LinkedIn profile"
            >
              <Linkedin size={20} />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
