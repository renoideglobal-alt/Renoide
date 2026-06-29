import { useEffect, useRef, useState } from "react";

/**
 * Premium two-layer cursor.
 * - Outer ring: lerped (smooth follow)
 * - Inner dot: precise tracking
 * - Expands & shows label on [data-cursor], a, button, [role="button"]
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string>("");
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest(
        "[data-cursor], a, button, [role='button'], input, textarea, select, label",
      ) as HTMLElement | null;
      if (!el) {
        setHover(false);
        setLabel("");
        return;
      }
      setHover(true);
      setLabel(el.getAttribute("data-cursor-text") || "");
    };
    const onOut = () => {
      setHover(false);
      setLabel("");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onOut);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onOut);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 rounded-full border border-ink/70 bg-background/10 backdrop-blur-[2px] transition-[width,height,background-color,border-color] duration-200 ease-out ${
          hover ? "h-16 w-16 bg-ink/5" : "h-8 w-8"
        } ${label ? "px-3 w-auto" : ""}`}
        style={{ willChange: "transform" }}
      >
        {label && (
          <span className="flex h-full w-full items-center justify-center whitespace-nowrap text-[11px] font-medium uppercase tracking-widest text-ink">
            {label}
          </span>
        )}
      </div>
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 rounded-full bg-ink transition-[opacity,width,height] duration-150 ${
          hover ? "h-1.5 w-1.5 opacity-60" : "h-1.5 w-1.5 opacity-100"
        }`}
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
