/**
 * A few small inline icons, hand-drawn as plain SVG rather than imported
 * from lucide-react/react-icons.
 *
 * Why: every icon that ships from a package is a named import, and if
 * that exact name doesn't exist in whatever version npm actually
 * resolved, the browser throws a hard "does not provide an export
 * named ..." error while loading the module — before React even starts,
 * which is what caused the blank-page bug. The safest fix for the
 * handful of icons that aren't already proven to exist (by being used
 * elsewhere in this same, working template) is to not import them at
 * all. These match lucide's visual style (24x24 grid, stroke-based,
 * currentColor) so they sit naturally next to real lucide icons.
 */

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function HomeIcon({ size = 24, className = '', ...rest }) {
  return (
    <svg width={size} height={size} className={className} {...base} {...rest}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  );
}

export function UserIcon({ size = 24, className = '', ...rest }) {
  return (
    <svg width={size} height={size} className={className} {...base} {...rest}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

export function CoffeeIcon({ size = 24, className = '', ...rest }) {
  return (
    <svg width={size} height={size} className={className} {...base} {...rest}>
      <path d="M4 9h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z" />
      <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" />
      <path d="M7 3v2M10.5 3v2M14 3v2" />
    </svg>
  );
}

export function CloudIcon({ size = 24, className = '', ...rest }) {
  return (
    <svg width={size} height={size} className={className} {...base} {...rest}>
      <path d="M7 18h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6.1 12.06 3.5 3.5 0 0 0 7 18Z" />
    </svg>
  );
}

export function TrendingUpIcon({ size = 24, className = '', ...rest }) {
  return (
    <svg width={size} height={size} className={className} {...base} {...rest}>
      <path d="M3 17 10 10l4 4 7-8" />
      <path d="M15 6h6v6" />
    </svg>
  );
}

export function LinkIcon({ size = 24, className = '', ...rest }) {
  return (
    <svg width={size} height={size} className={className} {...base} {...rest}>
      <path d="M9 15 15 9" />
      <path d="M11 6.5 13 4.5a3.5 3.5 0 0 1 5 5l-2 2" />
      <path d="M13 17.5 11 19.5a3.5 3.5 0 0 1-5-5l2-2" />
    </svg>
  );
}

export function RefreshIcon({ size = 24, className = '', ...rest }) {
  return (
    <svg width={size} height={size} className={className} {...base} {...rest}>
      <path d="M20 11a8 8 0 0 0-14.6-4.5M4 4v5h5" />
      <path d="M4 13a8 8 0 0 0 14.6 4.5M20 20v-5h-5" />
    </svg>
  );
}

export function GithubIcon({ size = 24, className = '', ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor" {...rest}>
      <path d="M12 .5C5.65.5.5 5.66.5 12.03c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.55-3.87-1.55-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.78 2.71 1.26 3.38.97.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.73 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.7 5.38-5.26 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.56A10.53 10.53 0 0 0 23.5 12.03C23.5 5.66 18.35.5 12 .5Z" />
    </svg>
  );
}

export function WhatsappIcon({ size = 24, className = '', ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor" {...rest}>
      <path d="M17.47 14.38c-.29-.15-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.14-.2.3-.75.94-.92 1.13-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.71-1.61-2-.17-.3-.02-.46.13-.6.13-.13.29-.34.44-.51.14-.17.19-.3.29-.49.1-.2.05-.37-.02-.51-.08-.15-.65-1.58-.9-2.16-.24-.57-.48-.5-.65-.5h-.56c-.2 0-.51.07-.78.37-.26.3-1.02 1-1.02 2.44s1.05 2.83 1.2 3.03c.14.2 2.06 3.16 5 4.43.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.11.56-.08 1.7-.7 1.94-1.36.24-.67.24-1.25.17-1.37-.07-.12-.26-.2-.55-.35Z" />
      <path d="M12.02 2C6.5 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.94 9.94 0 0 0 12.02 22C17.53 22 22 17.52 22 12S17.53 2 12.02 2Zm0 18.1a8.06 8.06 0 0 1-4.14-1.14l-.3-.18-3 .79.8-2.92-.19-.3A8.09 8.09 0 1 1 20.1 12a8.1 8.1 0 0 1-8.08 8.1Z" />
    </svg>
  );
}
