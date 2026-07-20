import { motion } from 'motion/react';
import { BadgeCheck } from 'lucide-react';

function Certifications() {
  const certifications = [
    {
      title: '5-Day AI Agents Intensive Course with Google',
      issuer: 'Google \u00d7 Kaggle',
      date: 'Dec 2025',
    },
    {
      title: 'MERN Full Stack Development',
      issuer: 'Code Galatta',
      date: null,
    },
    {
      title: 'Frontend Dev Training \u2014 React, TypeScript, Next.js',
      issuer: 'Code Galatta',
      date: null,
    },
    {
      title: 'Backend Dev Training \u2014 Node.js, Express.js, MongoDB, AWS',
      issuer: 'Code Galatta',
      date: null,
    },
    {
      title: 'Deloitte Data Analytics Simulation',
      issuer: 'Forage',
      date: 'Jun 2026',
    },
    {
      title: 'Prompt Engineering for ChatGPT',
      issuer: 'Great Learning',
      date: 'Nov 2024',
    },
    {
      title: 'Introduction to Artificial Intelligence',
      issuer: 'Great Learning',
      date: 'Nov 2024',
    },
  ];

  return (
    <section id="certifications" className="certifications py-24 px-6 relative overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            Certifications
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              whileHover={{ x: 6 }}
              className="flex items-start gap-4 rounded-2xl border p-5"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}
            >
              <span
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}
              >
                <BadgeCheck size={18} />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm md:text-base font-semibold leading-snug" style={{ color: 'var(--color-text)' }}>
                  {cert.title}
                </h3>
                <p className="text-xs md:text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
                  {cert.issuer}
                  {cert.date ? ` \u00b7 ${cert.date}` : ''}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;
