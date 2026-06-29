import { useEffect, useState } from "react";
import { RenoideMark } from "./RenoideLogo";

const KEY = "renoide-loaded";

export default function LoadingScreen() {
  const [show, setShow] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY)) return;
    setShow(true);
    sessionStorage.setItem(KEY, "1");
    const t1 = window.setTimeout(() => setFade(true), 1300);
    const t2 = window.setTimeout(() => setShow(false), 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] grid place-items-center bg-background transition-opacity duration-500 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden
    >
      <div className="flex flex-col items-center gap-7">
        <div className="relative">
          <div
            aria-hidden
            className="absolute inset-0 -m-6 rounded-full blur-2xl opacity-60"
            style={{ background: "radial-gradient(closest-side, rgba(26,115,235,0.35), transparent 70%)" }}
          />
          <div
            className="relative text-ink"
            style={{ animation: "logo-breathe 1.6s ease-in-out infinite" }}
          >
            <RenoideMark className="h-16 w-16 object-contain" />
          </div>
        </div>
        <p className="font-display text-sm font-semibold tracking-[0.36em] text-ink">RENOIDE</p>
        <div className="relative h-[2px] w-44 overflow-hidden rounded-full bg-border">
          <div
            className="absolute inset-y-0 left-0 w-1/3 rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, #1A73EB, #34C755, transparent)",
              animation: "loader-slide 1.3s ease-in-out forwards",
            }}
          />
        </div>
      </div>
      <style>{`
        @keyframes loader-slide {
          0% { transform: translateX(-100%); width: 30%; }
          60% { width: 70%; }
          100% { transform: translateX(320%); width: 30%; }
        }
        @keyframes logo-breathe {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.06); opacity: 0.85; }
        }
      `}</style>
    </div>
  );
}
