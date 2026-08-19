import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  UserCircle,
  Layers,
  Briefcase,
  GraduationCap,
  BadgeCheck,
  LogOut,
  ExternalLink,
  Sun,
  Moon,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Logo from '../Logo';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/about', label: 'About', icon: UserCircle },
  { to: '/admin/tech-stack', label: 'Tech Stack', icon: Layers },
  { to: '/admin/experience', label: 'Experience', icon: Briefcase },
  { to: '/admin/education', label: 'Education', icon: GraduationCap },
  { to: '/admin/certifications', label: 'Certifications', icon: BadgeCheck },
];

function AdminLayout() {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200`;

  const linkStyle = (isActive) => ({
    color: isActive ? '#ffffff' : 'var(--color-text)',
    backgroundColor: isActive ? 'var(--color-accent)' : 'transparent',
  });

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Sidebar */}
      <aside
        className="lg:w-64 flex-shrink-0 border-b lg:border-b-0 lg:border-r px-4 py-5 lg:min-h-screen lg:sticky lg:top-0"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
      >
        <div className="flex items-center justify-between lg:justify-start lg:gap-3 mb-6 px-1">
          <div className="flex items-center gap-3">
            <Logo className="h-7 w-7" color="var(--color-accent)" strokeWidth={22} />
            <div>
              <p className="text-sm font-bold leading-none" style={{ color: 'var(--color-text)' }}>
                Admin
              </p>
              {user?.email && (
                <p className="text-[11px] mt-1 truncate max-w-[9rem]" style={{ color: 'var(--color-muted)' }}>
                  {user.email}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClasses}>
              {({ isActive }) => (
                <span className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium whitespace-nowrap" style={linkStyle(isActive)}>
                  <Icon size={16} />
                  {label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div
          className="flex lg:flex-col gap-2 mt-4 lg:mt-8 pt-4 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <button
            type="button"
            onClick={toggleTheme}
            className="hidden lg:flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: 'var(--color-text)' }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
          <a
            href="/"
            className="flex items-center gap-2 lg:gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: 'var(--color-text)' }}
          >
            <ExternalLink size={16} /> <span className="hidden sm:inline lg:inline">View site</span>
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 lg:gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: '#e0294a' }}
          >
            <LogOut size={16} /> <span className="hidden sm:inline lg:inline">Sign out</span>
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 px-5 sm:px-8 py-8 max-w-5xl">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
