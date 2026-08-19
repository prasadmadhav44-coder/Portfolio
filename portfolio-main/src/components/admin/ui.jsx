/**
 * Small, theme-aware UI atoms shared by every /admin screen. All colors
 * come from the same CSS custom properties the public site uses
 * (index.css) — nothing here introduces a new palette.
 */

export function AdminCard({ children, className = '', style = {} }) {
  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 ${className}`}
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)', ...style }}
    >
      {children}
    </div>
  );
}

export function AdminButton({ children, variant = 'primary', className = '', ...rest }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: { backgroundColor: 'var(--color-accent)', color: '#ffffff' },
    ghost: { backgroundColor: 'transparent', color: 'var(--color-text)', border: '1px solid var(--color-border)' },
    danger: { backgroundColor: 'transparent', color: '#e0294a', border: '1px solid rgba(224,41,74,0.4)' },
  };

  return (
    <button className={`${base} ${className}`} style={variants[variant]} {...rest}>
      {children}
    </button>
  );
}

export function AdminLabel({ children }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--color-muted)' }}>
      {children}
    </label>
  );
}

const fieldStyle = {
  borderColor: 'var(--color-border)',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
};

export function AdminInput(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--color-accent)] ${props.className || ''}`}
      style={fieldStyle}
    />
  );
}

export function AdminTextarea(props) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--color-accent)] ${props.className || ''}`}
      style={fieldStyle}
    />
  );
}

export function AdminSelect({ children, ...rest }) {
  return (
    <select
      {...rest}
      className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
      style={fieldStyle}
    >
      {children}
    </select>
  );
}

export function AdminCheckbox({ label, ...rest }) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer select-none" style={{ color: 'var(--color-text)' }}>
      <input type="checkbox" {...rest} style={{ accentColor: 'var(--color-accent)' }} />
      {label}
    </label>
  );
}

export function AdminBanner({ children, tone = 'info' }) {
  const tones = {
    info: { borderColor: 'var(--color-accent)', color: 'var(--color-text)', backgroundColor: 'var(--color-accent-soft)' },
    error: { borderColor: 'rgba(224,41,74,0.5)', color: '#e0294a', backgroundColor: 'rgba(224,41,74,0.08)' },
  };
  return (
    <div className="rounded-lg border px-4 py-3 text-sm mb-5" style={tones[tone]}>
      {children}
    </div>
  );
}

export function EmptyState({ children }) {
  return (
    <div
      className="rounded-xl border border-dashed py-10 text-center text-sm"
      style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
    >
      {children}
    </div>
  );
}
