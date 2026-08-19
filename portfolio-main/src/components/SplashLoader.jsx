import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Guard against a duplicate run under React StrictMode remounts.
let _animationHasRun = false;

const MARK_POINTS = '16,84 16,16 50,54 84,16 84,84';

const SplashLoader = ({ onAnimationComplete }) => {
  const containerRef = useRef(null);
  const outlineRef = useRef(null);
  const fillRef = useRef(null);
  const glowRef = useRef(null);
  const progressBarRef = useRef(null);
  const percentRef = useRef({ value: 0 });
  const [percentDisplay, setPercentDisplay] = useState(0);
  const nameRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    if (_animationHasRun) {
      onAnimationComplete?.();
      return;
    }
    _animationHasRun = true;

    const outline = outlineRef.current;
    const fill = fillRef.current;
    const container = containerRef.current;
    if (!outline || !fill || !container) return;

    document.body.style.overflow = 'hidden';

    const length = outline.getTotalLength();
    gsap.set(outline, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
    gsap.set(fill, { opacity: 0, scale: 0.92, transformOrigin: '50% 50%' });
    gsap.set(glowRef.current, { opacity: 0 });
    gsap.set(nameRef.current, { opacity: 0, y: 14 });
    gsap.set(taglineRef.current, { opacity: 0, y: 10 });
    gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: '0% 50%' });

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => {
        gsap.to(container, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            document.body.style.overflow = '';
            onAnimationComplete?.();
          },
        });
      },
    });

    // 1. Outline draws itself
    tl.to(outline, { strokeDashoffset: 0, duration: 1.1 });

    // 2. Fill snaps in (the "M" becomes solid)
    tl.to(fill, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2)' }, '-=0.1');
    tl.to(outline, { opacity: 0, duration: 0.25 }, '<');

    // 3. Soft glow
    tl.to(glowRef.current, { opacity: 1, duration: 0.5 }, '-=0.2');

    // 4. Progress line + percentage, in parallel with the glow settling
    tl.to(
      progressBarRef.current,
      { scaleX: 1, duration: 1.1, ease: 'power1.inOut' },
      '-=0.1'
    );
    tl.to(
      percentRef.current,
      {
        value: 100,
        duration: 1.1,
        ease: 'power1.inOut',
        onUpdate: () => setPercentDisplay(Math.round(percentRef.current.value)),
      },
      '<'
    );

    // 5. Name + tagline
    tl.to(nameRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
    tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.25');

    // 6. Hold, then the outer onComplete fades everything into the Hero
    tl.to({}, { duration: 0.55 });

    return () => {
      document.body.style.overflow = '';
      tl.kill();
    };
  }, [onAnimationComplete]);

  return (
    <div
      ref={containerRef}
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100000] flex items-center justify-center"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Ambient glow behind the mark */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, var(--color-accent-soft) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Mark: outline draws first, then the solid fill takes over */}
        <div className="relative h-24 w-24 sm:h-28 sm:w-28">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <polyline
              ref={outlineRef}
              points={MARK_POINTS}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="4"
              strokeLinecap="square"
              strokeLinejoin="miter"
              strokeMiterlimit="3"
            />
          </svg>
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <polyline
              ref={fillRef}
              points={MARK_POINTS}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="17"
              strokeLinecap="square"
              strokeLinejoin="miter"
              strokeMiterlimit="3"
              style={{ filter: 'drop-shadow(0 0 14px var(--color-accent-soft))' }}
            />
          </svg>
        </div>

        {/* Progress line + percentage */}
        <div className="mt-10 flex w-56 flex-col items-center gap-3 sm:w-64">
          <div
            className="h-[2px] w-full overflow-hidden rounded-full"
            style={{ backgroundColor: 'var(--color-border)' }}
          >
            <div
              ref={progressBarRef}
              className="h-full w-full rounded-full"
              style={{ backgroundColor: 'var(--color-accent)' }}
            />
          </div>
          <span
            className="font-mono text-xs tracking-widest"
            style={{ color: 'var(--color-muted)' }}
          >
            {percentDisplay}%
          </span>
        </div>

        {/* Name + role */}
        <div className="mt-8 text-center">
          <p
            ref={nameRef}
            className="text-xl font-semibold tracking-tight sm:text-2xl"
            style={{ color: 'var(--color-text)' }}
          >
            Madhava Prasad
          </p>
          <p
            ref={taglineRef}
            className="mt-2 text-[11px] uppercase tracking-[0.2em] sm:text-xs"
            style={{ color: 'var(--color-muted)' }}
          >
            Software Engineer &bull; AI Agent Developer &bull; Full Stack Developer
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashLoader;
