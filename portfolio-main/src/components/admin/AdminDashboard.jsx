import { Link } from 'react-router-dom';
import { FolderKanban, UserCircle, Layers, Briefcase, GraduationCap, BadgeCheck, ArrowRight } from 'lucide-react';
import { AdminCard } from './ui';

const SECTIONS = [
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban, desc: 'Featured work, links, tags, write-ups' },
  { to: '/admin/about', label: 'About', icon: UserCircle, desc: 'Headline, bio paragraphs, quick facts' },
  { to: '/admin/tech-stack', label: 'Tech Stack', icon: Layers, desc: 'Categories and technologies, line by line' },
  { to: '/admin/experience', label: 'Experience', icon: Briefcase, desc: 'Leadership & workshop timeline entries' },
  { to: '/admin/education', label: 'Education', icon: GraduationCap, desc: 'Degrees, institutions, scores' },
  { to: '/admin/certifications', label: 'Certifications', icon: BadgeCheck, desc: 'Courses and credentials' },
];

function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
        Content Management
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--color-muted)' }}>
        Everything you edit here updates the live portfolio immediately — no redeploy needed.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SECTIONS.map(({ to, label, icon: Icon, desc }) => (
          <Link key={to} to={to}>
            <AdminCard className="h-full transition-transform duration-200 hover:-translate-y-0.5">
              <div className="flex items-start justify-between gap-3">
                <span
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}
                >
                  <Icon size={18} />
                </span>
                <ArrowRight size={16} style={{ color: 'var(--color-muted)' }} />
              </div>
              <p className="mt-4 font-semibold" style={{ color: 'var(--color-text)' }}>
                {label}
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
                {desc}
              </p>
            </AdminCard>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
