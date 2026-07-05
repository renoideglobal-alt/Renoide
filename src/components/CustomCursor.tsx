import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR = [
  "[data-cursor]",
  "a",
  "button",
  "[role='button']",
  "input",
  "textarea",
  "select",
  ".card-premium",
  ".founder-card",
  ".testimonial-card",
].join(",");

const MAGNETIC_SELECTOR = "a, button, [role='button'], .testimonial-card";

export default function CustomCursor() {
  const ringRef    = useRef<HTMLDivElement>(null);
  const dotRef     = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const [enabled,  setEnabled]  = useState(false);
  const [hover,    setHover]    = useState(false);
  const [down,     setDown]     = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const finePointer   = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    setEnabled(true);

    /* ── Lerp targets ───────────────────────────────────────── */
    const mouse  = { x: window.innerWidth  / 2, y: window.innerHeight / 2 };
    const ring   = { x: mouse.x, y: mouse.y };
    const dot    = { x: mouse.x, y: mouse.y };
    let raf      = 0;
    let magneticEl: HTMLElement | null = null;
    let isHoveringNow = false;

    /* ── RAF render loop ────────────────────────────────────── */
    const render = () => {
      // Ring: smooth slow follow (premium lag)
      ring.x += (mouse.x - ring.x) * 0.14;
      ring.y += (mouse.y - ring.y) * 0.14;

      // Dot: fast, almost immediate
      dot.x += (mouse.x - dot.x) * 0.55;
      dot.y += (mouse.y - dot.y) * 0.55;

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
      }
      if (pointerRef.current) {
        pointerRef.current.style.transform =
          `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-28%, -18%)`;
      }

      raf = requestAnimationFrame(render);
    };

    /* ── Magnetic reset ─────────────────────────────────────── */
    const resetMagnetic = () => {
      if (magneticEl) {
        magneticEl.style.transform = "";
        magneticEl = null;
      }
    };

    /* ── Mouse move ─────────────────────────────────────────── */
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const candidate = (e.target as HTMLElement | null)?.closest(
        MAGNETIC_SELECTOR
      ) as HTMLElement | null;

      if (!candidate || candidate.closest(".modal-scope")) {
        resetMagnetic();
        return;
      }

      magneticEl = candidate;
      const rect = candidate.getBoundingClientRect();
      const dx   = e.clientX - (rect.left + rect.width  / 2);
      const dy   = e.clientY - (rect.top  + rect.height / 2);
      candidate.style.transform = `translate3d(${dx * 0.05}px, ${dy * 0.05}px, 0)`;
    };

    /* ── Pointer over / out ─────────────────────────────────── */
    const onPointerOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest(INTERACTIVE_SELECTOR);
      const active = Boolean(el && !el.closest(".modal-scope"));
      if (active !== isHoveringNow) {
        isHoveringNow = active;
        setHover(active);
      }
    };

    const onPointerOut = (e: PointerEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (related?.closest(INTERACTIVE_SELECTOR)) return;
      if (isHoveringNow) {
        isHoveringNow = false;
        setHover(false);
      }
      resetMagnetic();
    };

    const onDown = () => setDown(true);
    const onUp   = () => setDown(false);

    raf = requestAnimationFrame(render);
    window.addEventListener("mousemove",   onMove,        { passive: true });
    document.addEventListener("pointerover",  onPointerOver, { passive: true });
    document.addEventListener("pointerout",   onPointerOut,  { passive: true });
    window.addEventListener("mousedown",   onDown,        { passive: true });
    window.addEventListener("mouseup",     onUp,          { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      resetMagnetic();
      window.removeEventListener("mousemove",  onMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout",  onPointerOut);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className={`custom-cursor ${hover ? "is-hover" : ""} ${down ? "is-down" : ""}`}
      aria-hidden
    >
      {/* Outer ring — slow follow */}
      <div ref={ringRef} className="custom-cursor__ring" />
      {/* Inner dot — fast follow */}
      <div ref={dotRef}  className="custom-cursor__dot"  />
      <div ref={pointerRef} className="custom-cursor__pointer" />
    </div>
  );
}
