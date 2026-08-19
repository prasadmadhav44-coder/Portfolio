import { motion } from 'motion/react';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { usePublicTable } from '../hooks/usePublicTable';
import { educationFallback } from '../data/educationData';

function Education() {
  const { data: education } = usePublicTable('education', { fallbackData: educationFallback });

  return (
    <section id="education" className="education py-24 px-6 relative overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            Education
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((item, idx) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border p-6 flex flex-col gap-4"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}
              >
                <GraduationCap size={20} />
              </span>

              <div>
                <h3 className="text-lg font-bold leading-snug" style={{ color: 'var(--color-text)' }}>
                  {item.degree}
                </h3>
                <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
                  {item.institution}
                </p>
              </div>

              <div className="mt-auto flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-muted)' }}>
                  <Calendar size={14} />
                  {item.period}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>
                  <Award size={14} />
                  {item.detail}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
