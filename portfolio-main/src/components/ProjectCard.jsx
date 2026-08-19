import { motion } from 'motion/react';
import { GithubIcon } from './icons.jsx';
import { ArrowRight, ExternalLink, Award } from 'lucide-react';

function ProjectCard({ project, onClick, isCompact = false }) {
  const { title, shortDescription, tags, live, github, status, featured } = project;

  const displayDescription =
    isCompact && shortDescription.length > 120
      ? shortDescription.substring(0, 120) + '...'
      : shortDescription;

  const hasLinks = Boolean(live || github);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: isCompact ? -3 : -8 }}
      className="group relative h-full cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
    >
      <div
        className={`h-full rounded-3xl transition-all duration-500 relative overflow-hidden ${
          isCompact ? 'p-5 border' : 'p-8 border-2'
        }`}
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}
      >
        <div className="relative z-10 flex flex-col h-full">
          {(featured || status) && (
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {featured && (
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
                  style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff' }}
                >
                  <Award size={11} />
                  Featured
                </span>
              )}
              {status && (
                <span
                  className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
                >
                  {status}
                </span>
              )}
            </div>
          )}

          <motion.h3
            className={`font-bold ${isCompact ? 'text-lg md:text-xl mb-2' : 'text-2xl md:text-3xl mb-4'}`}
            style={{ color: 'var(--color-text)' }}
            whileHover={{ scale: isCompact ? 1.01 : 1.02 }}
          >
            {title}
          </motion.h3>

          <p
            className={`leading-relaxed flex-grow ${
              isCompact ? 'mb-3 text-xs md:text-sm line-clamp-2' : 'mb-6'
            }`}
            style={{ color: 'var(--color-muted)' }}
          >
            {displayDescription}
          </p>

          <div className={`flex flex-wrap gap-1.5 ${isCompact ? 'mb-3' : 'gap-2 mb-6'}`}>
            {tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: isCompact ? 1.05 : 1.1 }}
                className={`rounded-full font-semibold transition-all ${
                  isCompact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'
                }`}
                style={{ backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <div
            className={`flex gap-4 items-center border-t ${isCompact ? 'pt-3' : 'pt-4'}`}
            style={{ borderColor: 'var(--color-border)' }}
          >
            {live && (
              <motion.a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`inline-flex items-center gap-1.5 rounded-full font-semibold transition-colors ${
                  isCompact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'
                }`}
                style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff' }}
              >
                <ExternalLink className={isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
                <span>Live Demo</span>
              </motion.a>
            )}
            {github && (
              <motion.a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`inline-flex items-center gap-1.5 rounded-full border font-semibold transition-colors ${
                  isCompact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'
                }`}
                style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
              >
                <GithubIcon className={isCompact ? "w-3.5 h-3.5" : "w-4 h-4"} />
                <span>GitHub</span>
              </motion.a>
            )}
            {!hasLinks && (
              <span
                className={`flex items-center gap-2 font-semibold ${isCompact ? 'text-sm' : ''}`}
                style={{ color: 'var(--color-accent)' }}
              >
                <span>View Details</span>
                <ArrowRight className={isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
