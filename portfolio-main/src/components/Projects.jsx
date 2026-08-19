import { motion } from 'motion/react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { usePublicTable } from '../hooks/usePublicTable';

// CMS rows come back snake_case (matching the `projects` table); the
// static fallback file is already camelCase, the shape ProjectCard /
// ProjectModal expect. Normalize so both sources render identically.
function normalizeProject(row) {
  if ('shortDescription' in row) return row; // already camelCase (static fallback)
  return {
    id: row.id,
    title: row.title,
    live: row.live_url || '',
    github: row.github_url || '',
    status: row.status,
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    tags: row.tags || [],
    features: row.features || [],
    challenges: row.challenges || [],
    solutions: row.solutions || [],
    featured: row.featured,
  };
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: rawProjects } = usePublicTable('projects', { fallbackData: projectsData });
  const allProjects = rawProjects.map(normalizeProject);

  const featuredProjects = allProjects.filter((p) => p.featured);
  const otherProjects = allProjects.filter((p) => !p.featured);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  return (
    <section id="projects" className="projects py-24 px-6 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-40 left-20 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            Projects
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '6rem' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 mx-auto rounded-full mb-6"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--color-muted)' }}
          >
            A selection of projects spanning full-stack web apps, multi-agent AI systems, and embedded systems.
          </motion.p>
        </motion.div>

        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onClick={() => handleProjectClick(project)} />
              ))}
            </motion.div>
          </div>
        )}

        {otherProjects.length > 0 && (
          <div className="mb-16">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold mb-8"
              style={{ color: 'var(--color-text)' }}
            >
              Other Projects
            </motion.h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {otherProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onClick={() => handleProjectClick(project)} isCompact />
              ))}
            </motion.div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com/prasadmadhav44-coder"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all duration-300"
            style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
          >
            <span>View More on GitHub</span>
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>

      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
}

export default Projects;
