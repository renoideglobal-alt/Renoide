import { Atom, Briefcase, HeartPulse, Landmark, ShoppingBag, Sparkle } from "lucide-react";

const LOGOS = [
  { name: "Nova Labs", icon: Atom },
  { name: "Lumen SaaS", icon: Sparkle },
  { name: "Vitalcare", icon: HeartPulse },
  { name: "Northwind", icon: Landmark },
  { name: "Kartora", icon: ShoppingBag },
  { name: "Atelier&Co", icon: Briefcase },
];

export default function TrustLogos() {
  return (
    <section className="container-x pb-16 md:pb-20">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-ink-muted">
        Trusted by startups & growing businesses
      </p>
      <div className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-6">
        {LOGOS.map(({ name, icon: Icon }) => (
          <div
            key={name}
            className="flex items-center justify-center gap-2 text-ink-muted opacity-70 transition-all duration-300 hover:opacity-100 hover:text-ink"
          >
            <Icon className="h-4 w-4" />
            <span className="font-display text-sm font-semibold tracking-tight">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
