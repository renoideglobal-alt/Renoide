import renoideLogo from "@/assets/renoide-logo.png";

type Props = {
  variant?: "symbol" | "lockup" | "stacked";
  className?: string;
  monochrome?: boolean;
};

export function RenoideMark({ className }: { className?: string; monochrome?: boolean }) {
  return (
    <img
      src={renoideLogo}
      alt=""
      aria-hidden="true"
      className={className}
      width={240}
      height={204}
      draggable={false}
    />
  );
}

export default function RenoideLogo({ variant = "lockup", className }: Props) {
  if (variant === "symbol") {
    return <RenoideMark className={className} />;
  }
  if (variant === "stacked") {
    return (
      <div className={`flex flex-col items-center gap-2 ${className ?? ""}`}>
        <RenoideMark className="h-16 w-16 object-contain md:h-20 md:w-20" />
        <div className="text-center">
          <p className="font-display text-2xl font-bold tracking-[0.22em] text-ink">RENOIDE</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.32em] text-ink-muted">
            Engineering <span className="text-primary">Intelligent</span> Futures
          </p>
        </div>
      </div>
    );
  }
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <RenoideMark className="h-9 w-auto object-contain md:h-12 lg:h-14" />
      <span className="font-display text-xl font-bold tracking-[0.14em] text-ink">RENOIDE</span>
    </span>
  );
}
