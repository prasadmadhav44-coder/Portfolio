import { motion } from 'motion/react';
import { GraduationCap, MapPin, Sparkles } from 'lucide-react';
import Logo from './Logo';

function AboutMe() {
  const facts = [
    { icon: MapPin, label: 'Location', value: 'Thiruvarur, India' },
    { icon: GraduationCap, label: 'Education', value: 'B.Tech, ECE — SASTRA University' },
    { icon: Sparkles, label: 'Focus', value: 'Software Engineering & Full-Stack Development' },
  ];

  return (
    <section id="about" className="about-me py-24 px-6 relative overflow-hidden bg-transparent">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: 'var(--color-text)' }}
          >
            About Me
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '6rem' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1.5 rounded-full mx-auto"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Decorative mark panel */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 50 }}
            className="w-full lg:w-5/12 flex justify-center"
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-6 rounded-3xl opacity-40 blur-2xl"
                style={{ backgroundColor: 'var(--color-accent)' }}
                animate={{ opacity: [0.25, 0.45, 0.25] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div
                className="relative w-72 h-72 md:w-80 md:h-80 rounded-3xl border-2 flex items-center justify-center"
                style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}
              >
                <Logo className="h-28 w-28 md:h-32 md:w-32" color="var(--color-accent)" strokeWidth={14} />
              </div>

              {/* Quick facts card, overlapping the panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[92%] rounded-2xl border p-5 shadow-xl space-y-3"
                style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}
              >
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}
                    >
                      <Icon size={16} />
                    </span>
                    <div className="text-left">
                      <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{label}</p>
                      <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{value}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 50, delay: 0.2 }}
            className="w-full lg:w-7/12 mt-16 lg:mt-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 text-lg leading-relaxed"
              style={{ color: 'var(--color-muted)' }}
            >
              <p className="text-xl md:text-2xl font-light" style={{ color: 'var(--color-text)' }}>
                Software engineer and full-stack developer specializing in multi-agent
                LLM applications, REST API design, and modern web development.
              </p>

              
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
