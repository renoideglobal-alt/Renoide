import renoideLogo from "@/assets/renoide-logo.png";

type Props = {
  variant?: "symbol" | "lockup" | "stacked";
  className?: string;
  monochrome?: boolean;
};

/** Square logo mark — the R-with-deer symbol */
function LogoMark({ size = "md" }: { size?: "sm" | "md" | "lg" | "xl" }) {
  const sizeMap = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
    xl: "h-18 w-18",
  };
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${sizeMap[size]}`}
      style={{ lineHeight: 0 }}
    >
      <img
        src={renoideLogo}
        alt="Renoide logo"
        draggable={false}
        className="h-full w-full object-contain"
        style={{ display: "block" }}
      />
    </span>
  );
}

export function RenoideMark({ className }: { className?: string; monochrome?: boolean }) {
  return (
    <span className={className}>
      <LogoMark size="md" />
    </span>
  );
}

export default function RenoideLogo({ variant = "lockup", className }: Props) {
  if (variant === "symbol") {
    return (
      <span className={className}>
        <LogoMark size="md" />
      </span>
    );
  }
  if (variant === "stacked") {
    return (
      <div className={`flex flex-col items-center gap-3 ${className ?? ""}`}>
        <LogoMark size="xl" />
        <div className="text-center">
          <p className="font-display text-2xl font-bold tracking-[0.22em] text-ink">RENOIDE</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.32em] text-ink-muted">
            Engineering <span className="text-primary">Intelligent</span> Futures
          </p>
        </div>
      </div>
    );
  }
  // lockup (default) — horizontal logo + wordmark
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark size="md" />
      <span className="font-display text-xl font-bold tracking-[0.14em] text-ink">RENOIDE</span>
    </span>
  );
}
