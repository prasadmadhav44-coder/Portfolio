import { motion } from 'motion/react';
import { MapPin, Briefcase, Calendar } from 'lucide-react';
import { usePublicTable } from '../hooks/usePublicTable';
import { experienceFallback } from '../data/experienceData';

function Experience() {
  const { data: experiences } = usePublicTable('experience', { fallbackData: experienceFallback });

  return (
    <section id="experience" className="experience py-24 px-6 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            Experience
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

        <div className="relative">
          {/* Vertical Timeline Line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute left-0 md:left-12 top-0 w-0.5"
            style={{ backgroundColor: 'var(--color-border)' }}
          />

          {experiences.map((experience, idx) => (
            <motion.article
              key={experience.title}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 + idx * 0.15 }}
              className="relative pl-12 md:pl-32 pb-16"
            >
              {/* Timeline Dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.3 + idx * 0.15 }}
                className="absolute left-0 md:left-12 top-2 -translate-x-1/2 w-5 h-5 rounded-full border-4"
                style={{ backgroundColor: 'var(--color-accent)', borderColor: 'var(--color-bg)' }}
              >
                <motion.div
                  animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                />
              </motion.div>

              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                  {experience.title}
                </h3>
                <p className="text-lg md:text-xl font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
                  {experience.company}
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm md:text-base" style={{ color: 'var(--color-muted)' }}>
                    <Calendar size={16} style={{ color: 'var(--color-accent)' }} />
                    <span>{experience.period}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm md:text-base" style={{ color: 'var(--color-muted)' }}>
                    <MapPin size={16} style={{ color: 'var(--color-accent)' }} />
                    <span>{experience.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm md:text-base" style={{ color: 'var(--color-muted)' }}>
                    <Briefcase size={16} style={{ color: 'var(--color-accent)' }} />
                    <span>{experience.type}</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-3">
                {experience.description.map((point, pIdx) => (
                  <li key={pIdx} className="group/item">
                    <motion.div whileHover={{ x: 8 }} className="flex items-start gap-3">
                      <div className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />
                      <span className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                        {point}
                      </span>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
