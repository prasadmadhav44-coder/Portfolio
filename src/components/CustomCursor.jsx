import { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, summary, [data-cursor="pointer"]';

const LERP_POSITION = 0.2;
const LERP_SCALE = 0.22;

/**
 * Premium custom cursor — an inner dot that tracks the pointer exactly,
 * and a trailing outer ring that eases toward it. When hovering a
 * clickable element, the ring "snaps" to that element's center and
 * grows to roughly its size (a magnetic feel) instead of just sitting
 * on the raw pointer position.
 *
 * Disabled automatically on touch/coarse-pointer devices and when the
 * user has requested reduced motion — native cursor is used instead.
 */
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(!isCoarsePointer && !prefersReducedMotion);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    document.body.classList.add('custom-cursor-active');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;
    let ringScale = 1;
    let angle = 0;
    let stretch = 0;
    let hoveredRect = null;
    let rafId = 0;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      const target = e.target instanceof Element ? e.target.closest(INTERACTIVE_SELECTOR) : null;
      hoveredRect = target ? target.getBoundingClientRect() : null;
    };

    const handleLeaveWindow = () => {
      hoveredRect = null;
    };

    const spawnRipple = (x, y) => {
      const ripple = document.createElement('span');
      ripple.className = 'cc-ripple';
      ripple.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1)`;
      ripple.style.left = '0px';
      ripple.style.top = '0px';
      document.body.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    };

    const handleDown = (e) => {
      ringRef.current?.classList.add('cc-ring--click');
      spawnRipple(e.clientX, e.clientY);
    };
    const handleUp = () => {
      ringRef.current?.classList.remove('cc-ring--click');
    };

    const animate = () => {
      let targetX = mouseX;
      let targetY = mouseY;
      let targetScale = 1;

      if (hoveredRect) {
        targetX = hoveredRect.left + hoveredRect.width / 2;
        targetY = hoveredRect.top + hoveredRect.height / 2;
        const fit = Math.max(hoveredRect.width, hoveredRect.height) / 34 + 0.6;
        targetScale = Math.min(Math.max(fit, 1.4), 3.4);
      }

      ringX += (targetX - ringX) * LERP_POSITION;
      ringY += (targetY - ringY) * LERP_POSITION;
      ringScale += (targetScale - ringScale) * LERP_SCALE;

      // Velocity-based "liquid" motion: the ring briefly stretches along
      // its direction of travel and relaxes back to a circle at rest —
      // a subtle squash-and-stretch that makes the trailing ring read as
      // alive rather than a static shape lagging behind the pointer.
      const dx = mouseX - prevMouseX;
      const dy = mouseY - prevMouseY;
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      const speed = Math.hypot(dx, dy);

      if (!hoveredRect && speed > 0.5) {
        angle = Math.atan2(dy, dx) * (180 / Math.PI);
      }
      const targetStretch = hoveredRect ? 0 : Math.min(speed / 45, 0.55);
      stretch += (targetStretch - stretch) * 0.18;

      const scaleX = ringScale * (1 + stretch);
      const scaleY = ringScale * (1 - stretch * 0.55);

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
        ringRef.current.style.opacity = hoveredRect ? '0.85' : '1';
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    document.addEventListener('mouseleave', handleLeaveWindow);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      document.removeEventListener('mouseleave', handleLeaveWindow);
      cancelAnimationFrame(rafId);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cc-dot" aria-hidden="true" />
      <div ref={ringRef} className="cc-ring" aria-hidden="true" />
    </>
  );
}

export default CustomCursor;
