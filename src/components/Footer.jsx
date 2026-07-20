import { Github, Linkedin, Mail } from 'lucide-react';
import Logo from './Logo';

function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="site-footer border-t px-6 py-12" style={{ borderColor: 'var(--color-border)' }}>
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            <Logo className="h-[18px] w-[18px]" color="#ffffff" strokeWidth={16} />
          </span>
          <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
            Madhava Prasad
          </span>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-sm transition-colors"
              style={{ color: 'var(--color-muted)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/prasadmadhav44-coder"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="p-2 rounded-lg transition-colors"
            style={{ color: 'var(--color-muted)' }}
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/madhavaprasadkg/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="p-2 rounded-lg transition-colors"
            style={{ color: 'var(--color-muted)' }}
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:prasadmadhav44@gmail.com"
            aria-label="Send an email"
            className="p-2 rounded-lg transition-colors"
            style={{ color: 'var(--color-muted)' }}
          >
            <Mail size={18} />
          </a>
        </div>
      </div>

      <p className="mt-8 text-center text-xs" style={{ color: 'var(--color-muted)' }}>
        &copy; {year} Madhava Prasad. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
