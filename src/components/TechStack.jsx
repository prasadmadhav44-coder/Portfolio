import { motion } from 'motion/react';
import { useState } from 'react';
import { Code2 } from 'lucide-react';
import { usePublicTechStack } from '../hooks/usePublicTechStack';
import { techStackFallback } from '../data/techStackData.js';

/**
 * TechStack — formerly "Skills". Each category is a heading followed by
 * its technologies as bordered chips that wrap onto as many lines as
 * needed, so the section always fits the viewport width instead of
 * requiring horizontal scroll or overflow on smaller screens.
 *
 * Brand logos are loaded from the Simple Icons CDN (cdn.simpleicons.org)
 * as plain <img> tags rather than imported from the react-icons npm
 * package. This is deliberate: an npm-imported icon that doesn't exist
 * in whatever exact version got installed crashes the *entire app* (a
 * hard "does not provide an export" error, thrown before React even
 * mounts). A CDN image with a wrong/renamed slug just fails to load
 * that one small icon — the BrandIcon component below catches that and
 * falls back to a generic code icon instead, so a single bad slug can
 * never take down the page again.
 *
 * Note: the slug is requested with NO color suffix, so each logo
 * renders in its own official brand color (Python blue/yellow,
 * MongoDB green, Docker blue, etc.) instead of being tinted to the
 * site accent. Every brand chip sits on a fixed light backing (see
 * the swatch below) so that color reads correctly and consistently
 * in both the light and dark theme.
 *
 * Concepts without an official brand mark (e.g. "REST APIs") use a
 * plain lucide-react icon — every lucide icon used here is one already
 * proven to work elsewhere in this exact codebase.
 */
function BrandIcon({ slug, size = 16 }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <Code2 size={size} style={{ color: 'var(--color-accent)' }} />;
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}`}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ display: 'block' }}
    />
  );
}

function TechStack() {
  const { categories } = usePublicTechStack(techStackFallback);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const groupVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 16 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <section id="skills" className="tech-stack py-20 px-6 relative overflow-hidden bg-transparent">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            Tech Stack
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '6rem' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 mx-auto rounded-full"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
        </motion.div>

        {/* Category groups, stacked vertically — chips inside each
            group wrap freely so every screen width stays overflow-free. */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col gap-10"
        >
          {categories.map((category) => (
            <motion.div key={category.title} variants={groupVariants} className="min-w-0">
              <h3
                className="text-lg sm:text-xl font-semibold mb-4"
                style={{ color: 'var(--color-accent)' }}
              >
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {category.items.map(({ name, brand, Icon }) => {
                  const FallbackIcon = Icon || Code2;
                  return (
                    <motion.div
                      key={name}
                      variants={itemVariants}
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                      className="group flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 transition-colors duration-200"
                      style={{
                        borderColor: 'var(--color-border)',
                        backgroundColor: 'var(--color-card)',
                      }}
                    >
                      <span
                        className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md transition-all duration-300 group-hover:shadow-[0_0_10px_var(--color-accent-soft)]"
                        style={{
                          // Fixed light backing (independent of theme) so
                          // each brand mark's own color always reads
                          // correctly, even in dark mode.
                          backgroundColor: brand ? '#ffffff' : 'var(--color-accent-soft)',
                          color: 'var(--color-accent)',
                        }}
                      >
                        {brand ? <BrandIcon slug={brand} size={14} /> : <FallbackIcon size={14} />}
                      </span>
                      <span className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--color-text)' }}>
                        {name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default TechStack;