import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useId } from 'react';
import { X, ExternalLink, Github, Check } from 'lucide-react';

function ProjectModal({ project, isOpen, onClose }) {
  const dialogRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Focus management: send focus into the dialog on open, trap Tab/Shift+Tab
  // inside it while it's open, and hand focus back to whatever triggered it
  // (the project card) once it closes — standard modal a11y expectations.
  useEffect(() => {
    if (!isOpen) return undefined;

    previouslyFocusedRef.current = document.activeElement;
    const focusTimer = setTimeout(() => dialogRef.current?.focus(), 50);

    const getFocusable = () =>
      dialogRef.current
        ? Array.from(
            dialogRef.current.querySelectorAll(
              'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
            )
          )
        : [];

    const handleTrap = (e) => {
      if (e.key !== 'Tab') return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleTrap);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleTrap);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [isOpen]);

  if (!project) return null;

  const hasChallenges = project.challenges?.length > 0;
  const hasSolutions = project.solutions?.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          <div className="fixed inset-0 z-[60] overflow-hidden">
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-screen h-screen border-0 md:border-2 overflow-y-auto shadow-2xl outline-none"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="fixed top-4 right-4 md:top-6 md:right-6 z-[100] p-3 rounded-xl transition-all duration-300 border"
                style={{
                  backgroundColor: 'var(--color-accent-soft)',
                  color: 'var(--color-accent)',
                  borderColor: 'var(--color-border)',
                }}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <div className="relative z-10 h-full overflow-y-auto overscroll-contain custom-scrollbar px-6 py-20 md:px-12 md:py-24">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-12"
                >
                  {project.status && (
                    <span
                      className="inline-block mb-3 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                      style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
                    >
                      {project.status}
                    </span>
                  )}
                  <h2 id={titleId} className="text-3xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                    {project.title}
                  </h2>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, i) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15 + i * 0.05 }}
                        className="px-3 py-1.5 rounded-full text-sm font-semibold"
                        style={{ backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 transition-all duration-300"
                        style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
                      >
                        <ExternalLink size={18} />
                        View Live
                      </motion.a>
                    )}
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 transition-all duration-300"
                        style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
                      >
                        <Github size={18} />
                        GitHub
                      </motion.a>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="h-px mb-8"
                  style={{ backgroundColor: 'var(--color-border)' }}
                />

                {/* Overview */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mb-12"
                >
                  <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                    Overview
                  </h3>
                  <p className="leading-8 text-base md:text-lg" style={{ color: 'var(--color-muted)' }}>
                    {project.fullDescription}
                  </p>
                </motion.section>

                {/* Key Features */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-12"
                >
                  <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {project.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45 + i * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <Check size={20} className="flex-shrink-0 mt-1" style={{ color: 'var(--color-accent)' }} />
                        <span className="leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.section>

                {/* Challenges & Solutions */}
                {(hasChallenges || hasSolutions) && (
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-12"
                  >
                    <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                      Challenges &amp; Solutions
                    </h3>

                    {hasChallenges && (
                      <>
                        <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
                          Challenges
                        </h4>
                        <ul className="space-y-2 mb-6">
                          {project.challenges.map((challenge, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.55 + i * 0.05 }}
                              className="flex items-start gap-3 pl-4"
                              style={{ color: 'var(--color-muted)' }}
                            >
                              <span>&bull;</span>
                              <span>{challenge}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </>
                    )}

                    {hasSolutions && (
                      <>
                        <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
                          Solutions
                        </h4>
                        <ul className="space-y-2">
                          {project.solutions.map((solution, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + i * 0.05 }}
                              className="flex items-start gap-3 pl-4"
                              style={{ color: 'var(--color-muted)' }}
                            >
                              <span>&bull;</span>
                              <span>{solution}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </>
                    )}
                  </motion.section>
                )}
              </div>
            </motion.div>
          </div>

          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: var(--color-accent-soft);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: var(--color-accent);
              opacity: 0.5;
              border-radius: 10px;
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}

export default ProjectModal;
