import { useEffect, useRef, useState } from 'react';

export default function ScrollProgress({ accent = '#d4af37', ink = '#111111' }) {
  const progressRef = useRef(null);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    let frame = 0;
    let lastVisible = false;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const root = document.documentElement;
        const available = root.scrollHeight - window.innerHeight;
        const progress = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;

        const visible = window.scrollY > 480;
        if (visible !== lastVisible) {
          lastVisible = visible;
          setShowTopButton(visible);
        }
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const goToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] bg-black/10">
        <div
          ref={progressRef}
          className="h-full origin-left"
          style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}88`, transform: 'scaleX(0)' }}
        />
      </div>
      <button
        type="button"
        aria-label="Back to top"
        title="Back to top"
        aria-hidden={!showTopButton}
        onClick={goToTop}
        tabIndex={showTopButton ? 0 : -1}
        className={`fixed bottom-6 right-6 z-[45] grid h-11 w-11 place-items-center rounded-full border shadow-lg transition duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 ${showTopButton ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
        style={{ backgroundColor: accent, borderColor: accent, color: ink }}
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
          <path d="M10 15V5m0 0L5.75 9.25M10 5l4.25 4.25" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
}
