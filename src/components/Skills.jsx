import { motion } from 'motion/react';
import { Code2, Bot, Monitor, Server, Database, Wrench } from 'lucide-react';

function Skills() {
  const skillCategories = [
    {
      title: 'Languages',
      icon: Code2,
      skills: ['Python', 'JavaScript', 'TypeScript', 'Java'],
    },
    {
      title: 'Frontend',
      icon: Monitor,
      skills: [
        'React.js',
        'Next.js',
        'HTML5',
        'CSS3',
        'Tailwind CSS',
        'Bootstrap 5',
        'Vite',
        'React Router',
        'React Hook Form',
      ],
    },
    {
      title: 'Backend',
      icon: Server,
      skills: ['Flask', 'Node.js', 'Express.js', 'REST APIs'],
    },
    {
      title: 'AI / GenAI',
      icon: Bot,
      skills: ['Google ADK', 'Prompt Engineering', 'Multi-agent Orchestration', 'LangChain'],
    },
    {
      title: 'Databases',
      icon: Database,
      skills: ['MongoDB', 'Pandas'],
    },
    {
      title: 'DevOps & Tools',
      icon: Wrench,
      skills: ['Git', 'GitHub Actions', 'AWS', 'Docker', 'Vercel', 'Firebase', 'Render.com', 'Zod'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15, duration: 0.5 },
    },
  };

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 200, damping: 15 },
    },
  };

  return (
    <section id="skills" className="skills py-20 px-6 relative overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            Skills
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

        {/* Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={categoryVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group/category relative"
            >
              <div
                className="relative p-5 rounded-2xl border transition-all duration-500 overflow-hidden h-full"
                style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}
              >
                <div className="relative z-10">
                  {/* Header */}
                  <motion.div
                    className="flex items-start gap-2.5 mb-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + categoryIndex * 0.05 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 180, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="p-2 rounded-lg border flex-shrink-0"
                      style={{
                        backgroundColor: 'var(--color-accent-soft)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-accent)',
                      }}
                    >
                      <category.icon size={18} strokeWidth={2} />
                    </motion.div>

                    <div className="flex-1 min-w-0 pt-0.5">
                      <h3
                        className="text-base md:text-lg font-bold leading-tight"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {category.title}
                      </h3>
                    </div>

                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.25 + categoryIndex * 0.05 }}
                      className="px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}
                    >
                      {category.skills.length}
                    </motion.span>
                  </motion.div>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + categoryIndex * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="h-px mb-4 origin-left"
                    style={{ backgroundColor: 'var(--color-border)' }}
                  />

                  {/* Skill Pills */}
                  <motion.div variants={containerVariants} className="flex flex-wrap justify-center gap-2">
                    {category.skills.map((skill) => (
                      <motion.div key={skill} variants={skillItemVariants} whileHover={{ scale: 1.05, y: -2 }}>
                        <div
                          className="px-3 py-1.5 rounded-lg border transition-all duration-300 cursor-default"
                          style={{
                            backgroundColor: 'var(--color-accent-soft)',
                            borderColor: 'var(--color-border)',
                          }}
                        >
                          <span
                            className="text-xs md:text-sm font-medium whitespace-nowrap"
                            style={{ color: 'var(--color-text)' }}
                          >
                            {skill}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
