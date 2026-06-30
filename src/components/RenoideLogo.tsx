import renoideLogoIco from "../logo/logoooo.ico";

type Props = {
  variant?: "symbol" | "lockup" | "stacked";
  className?: string;
  monochrome?: boolean;
};

/** Circular frame wrapping the logo mark */
function CircularMark({ size = "md" }: { size?: "sm" | "md" | "lg" | "xl" }) {
  const sizeMap = {
    sm: "h-9 w-9",
    md: "h-11 w-11",
    lg: "h-16 w-16",
    xl: "h-20 w-20",
  };
  const imgSizeMap = {
    sm: "h-6 w-6",
    md: "h-7 w-7",
    lg: "h-11 w-11",
    xl: "h-14 w-14",
  };
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full ${sizeMap[size]} shrink-0`}
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)",
        boxShadow:
          "0 0 0 2px rgba(26,115,235,0.55), 0 0 0 4px rgba(52,199,85,0.25), 0 2px 8px rgba(26,115,235,0.18)",
      }}
    >
      <img
        src={renoideLogoIco}
        alt="Renoide logo"
        draggable={false}
        className={`${imgSizeMap[size]} object-contain`}
      />
    </span>
  );
}

export function RenoideMark({ className }: { className?: string; monochrome?: boolean }) {
  return <CircularMark size="md" />;
}

export default function RenoideLogo({ variant = "lockup", className }: Props) {
  if (variant === "symbol") {
    return (
      <span className={className}>
        <CircularMark size="md" />
      </span>
    );
  }
  if (variant === "stacked") {
    return (
      <div className={`flex flex-col items-center gap-3 ${className ?? ""}`}>
        <CircularMark size="xl" />
        <div className="text-center">
          <p className="font-display text-2xl font-bold tracking-[0.22em] text-ink">RENOIDE</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.32em] text-ink-muted">
            Engineering <span className="text-primary">Intelligent</span> Futures
          </p>
        </div>
      </div>
    );
  }
  // lockup (default)
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <CircularMark size="md" />
      <span className="font-display text-xl font-bold tracking-[0.14em] text-ink">RENOIDE</span>
    </span>
  );
}
