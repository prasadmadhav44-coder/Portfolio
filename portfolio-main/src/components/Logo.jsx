import { forwardRef } from 'react';

/**
 * Logo — the "M" monogram mark.
 *
 * Drawn as a single zigzag polyline (down-up-down-up) — the same
 * skeleton shape as the original design. Rendered bold with sharp,
 * mitered corners and square (flat) terminals for a confident,
 * geometric "wordmark" feel (think Stripe/fintech-style bold
 * lettermarks) rather than a soft rounded outline.
 *
 * This keeps the mark a single continuous path, which is what lets
 * SplashLoader animate it with stroke-dasharray ("draw the outline,
 * then thicken to a filled mark"). Reused as-is in Navbar, Footer and
 * SplashLoader so the mark is pixel-identical everywhere it appears.
 */
const Logo = forwardRef(function Logo(
  { className = '', strokeWidth = 20, color = 'currentColor', ...rest },
  ref
) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <polyline
        points="16,84 16,16 50,54 84,16 84,84"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeMiterlimit="3"
      />
    </svg>
  );
});

export default Logo;
