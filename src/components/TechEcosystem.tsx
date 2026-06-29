import { useState } from "react";
import {
  Layout,
  Server,
  Smartphone,
  Brain,
  Cloud,
  Database,
  Workflow,
  Sparkles,
} from "lucide-react";

type Tech = { name: string; purpose: string; usage: string };
type Node = {
  key: string;
  label: string;
  icon: typeof Layout;
  position: {
    left: number;
    top: number;
  };
  techs: Tech[];
};

const NODES: Node[] = [
  {
    key: "frontend",
    label: "Frontend",
    icon: Layout,
    position: { left: 50, top: 14 },
    techs: [
      { name: "React", purpose: "Modern responsive web applications", usage: "Scalable UIs for SaaS and enterprise platforms." },
      { name: "Next.js", purpose: "Production-grade React framework", usage: "Marketing sites, dashboards & SSR apps." },
      { name: "TypeScript", purpose: "Type-safe JavaScript", usage: "Reliable codebases across every project." },
      { name: "Tailwind", purpose: "Utility-first styling", usage: "Design systems that ship fast and stay consistent." },
    ],
  },
  {
    key: "ai",
    label: "AI",
    icon: Brain,
    position: { left: 72, top: 23 },
    techs: [
      { name: "OpenAI", purpose: "Foundation models", usage: "Reasoning agents, copilots, content systems." },
      { name: "LangChain", purpose: "Agent orchestration", usage: "Multi-step AI workflows with tools and memory." },
      { name: "Vector DBs", purpose: "Semantic search storage", usage: "Knowledge retrieval for RAG systems." },
      { name: "RAG Systems", purpose: "Grounded AI responses", usage: "Answers based on a client's own knowledge base." },
      { name: "AI Agents", purpose: "Autonomous task execution", usage: "Support, sales and operations automation." },
    ],
  },
  {
    key: "cloud",
    label: "Cloud",
    icon: Cloud,
    position: { left: 84, top: 50 },
    techs: [
      { name: "AWS", purpose: "Enterprise cloud infrastructure", usage: "Production hosting at any scale." },
      { name: "Vercel", purpose: "Frontend & edge platform", usage: "Instant deploys for web apps and APIs." },
      { name: "Docker", purpose: "Containerized environments", usage: "Reproducible builds across every stage." },
      { name: "Cloudflare", purpose: "Edge networking & CDN", usage: "Global performance and security." },
    ],
  },
  {
    key: "automation",
    label: "Automation",
    icon: Workflow,
    position: { left: 72, top: 77 },
    techs: [
      { name: "n8n", purpose: "Open-source workflow engine", usage: "Self-hosted business automations." },
      { name: "Zapier", purpose: "App-to-app automations", usage: "Quick integrations across 5000+ tools." },
      { name: "Make", purpose: "Visual workflow builder", usage: "Complex multi-step routines without code." },
      { name: "Custom Workflows", purpose: "Bespoke automations", usage: "Code-driven systems built for scale." },
    ],
  },
  {
    key: "database",
    label: "Database",
    icon: Database,
    position: { left: 50, top: 86 },
    techs: [
      { name: "PostgreSQL", purpose: "Relational database", usage: "Source of truth for most products we ship." },
      { name: "Supabase", purpose: "Postgres + auth + storage", usage: "Full backend for MVPs and SaaS." },
      { name: "MongoDB", purpose: "Document database", usage: "Flexible schemas for content-heavy apps." },
    ],
  },
  {
    key: "backend",
    label: "Backend",
    icon: Server,
    position: { left: 28, top: 77 },
    techs: [
      { name: "Node.js", purpose: "JavaScript on the server", usage: "Realtime APIs and integration layers." },
      { name: "Express", purpose: "Minimal Node web framework", usage: "Lightweight REST services and middleware." },
      { name: "Python", purpose: "AI, data & scripting", usage: "ML pipelines, RAG systems, automation jobs." },
      { name: "FastAPI", purpose: "High-performance Python APIs", usage: "AI-backed services with typed endpoints." },
    ],
  },
  {
    key: "mobile",
    label: "Mobile",
    icon: Smartphone,
    position: { left: 16, top: 50 },
    techs: [
      { name: "Flutter", purpose: "Cross-platform native apps", usage: "Single codebase for iOS and Android." },
      { name: "React Native", purpose: "JS-based mobile apps", usage: "Faster delivery for teams already using React." },
    ],
  },
];

export default function TechEcosystem() {
  const [active, setActive] = useState<string | null>("ai");

  return (
    <section className="border-t border-border bg-background py-24 md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
            Technology Ecosystem
          </p>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-5xl">
            Building modern digital products with industry-leading technologies.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            Every stack we use is battle-tested in production — chosen for reliability, scale and developer joy.
          </p>
        </div>

        {/* Network diagram — visible on lg+ */}
        <div className="relative mx-auto mt-16 hidden h-[720px] w-full max-w-[1200px] overflow-hidden lg:block">
          <svg
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
            viewBox="0 0 1200 720"
            fill="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="net-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1A73EB" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#34C755" stopOpacity="0.5" />
              </linearGradient>
              <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1A73EB" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#1A73EB" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="600" cy="360" r="245" fill="url(#core-glow)" />
            {NODES.map((n) => {
              const x = n.position.left * 12;
              const y = n.position.top * 7.2;
              const isActive = active === n.key;
              return (
                <line
                  key={n.key}
                  x1="600"
                  y1="360"
                  x2={x}
                  y2={y}
                  stroke={isActive ? "url(#net-grad)" : "currentColor"}
                  strokeOpacity={isActive ? 1 : 0.15}
                  strokeWidth={isActive ? 1.5 : 1}
                  strokeDasharray={isActive ? "8 10" : "4 8"}
                  className={`text-ink ${isActive ? "tech-line-active" : ""}`}
                />
              );
            })}
          </svg>

          {/* Core */}
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <div
              className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full border border-border bg-surface-2 shadow-[0_30px_80px_-20px_rgba(26,115,235,0.45)]"
            >
              <span
                aria-hidden
                className="absolute inset-0 rounded-full opacity-60 blur-xl"
                style={{ background: "radial-gradient(closest-side, rgba(26,115,235,0.35), transparent)" }}
              />
              <Sparkles className="relative h-5 w-5 text-ink" />
              <p className="relative mt-1.5 text-[11px] font-semibold tracking-[0.2em] text-ink">RENOIDE</p>
              <p className="relative text-[10px] uppercase tracking-widest text-ink-muted">Core</p>
            </div>
          </div>

          {/* Nodes */}
          {NODES.map((n, index) => {
            const isActive = active === n.key;
            const Icon = n.icon;
            return (
              <div
                key={n.key}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 will-change-transform"
                style={{
                  left: `${n.position.left}%`,
                  top: `${n.position.top}%`,
                  animation: `tech-node-float ${4 + (index % 5)}s ease-in-out ${index * 0.35}s infinite alternate`,
                }}
              >
                <button
                  onMouseEnter={() => setActive(n.key)}
                  onFocus={() => setActive(n.key)}
                  className={`group rounded-2xl border bg-surface-2 px-4 py-3 text-left transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform hover:scale-105 ${
                    isActive
                      ? "border-primary/60 shadow-[0_28px_70px_-25px_rgba(26,115,235,0.6)]"
                      : "border-border shadow-[0_18px_48px_-35px_rgba(17,17,17,0.28)] hover:border-primary/50 hover:shadow-[0_28px_70px_-30px_rgba(26,115,235,0.4)]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`grid h-9 w-9 place-items-center rounded-lg transition-colors duration-300 ${
                        isActive ? "bg-ink text-background" : "bg-primary/10 text-primary"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-ink-muted">Layer</p>
                      <p className="text-sm font-semibold text-ink">{n.label}</p>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Active details panel (desktop) */}
        <div className="mx-auto mt-10 hidden max-w-4xl lg:block">
          <ActiveDetails node={NODES.find((n) => n.key === active) ?? NODES[2]} />
        </div>

        {/* Mobile fallback: grid of category cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:hidden">
          {NODES.map((n) => (
            <MobileCard key={n.key} node={n} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes tech-node-float {
          from { transform: translate(-50%, -50%) translateY(0); }
          to { transform: translate(-50%, -50%) translateY(-6px); }
        }

        .tech-line-active {
          animation: tech-line-dash 7s linear infinite;
        }

        @keyframes tech-line-dash {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -72; }
        }
      `}</style>
    </section>
  );
}

function ActiveDetails({ node }: { node: Node }) {
  const Icon = node.icon;
  return (
    <div className="rounded-3xl border border-border bg-surface-2 p-7 shadow-[0_40px_80px_-50px_rgba(17,17,17,0.35)]">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-ink-muted">Layer</p>
          <p className="font-display text-lg font-semibold text-ink">{node.label}</p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {node.techs.map((t) => (
          <div
            key={t.name}
            className="group relative overflow-hidden rounded-2xl border border-border bg-background p-4 transition-all hover:-translate-y-0.5 hover:border-ink/50 hover:shadow-[0_20px_40px_-25px_rgba(17,17,17,0.3)]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
              style={{ background: "linear-gradient(135deg, #1A73EB, #34C755)" }}
            />
            <p className="relative font-display text-sm font-semibold text-ink">{t.name}</p>
            <p className="relative mt-1 text-[11px] uppercase tracking-widest text-ink-muted">{t.purpose}</p>
            <p className="relative mt-2 text-xs leading-relaxed text-ink-muted">{t.usage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileCard({ node }: { node: Node }) {
  const Icon = node.icon;
  return (
    <div className="rounded-2xl border border-border bg-surface-2 p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <p className="font-display text-base font-semibold text-ink">{node.label}</p>
      </div>
      <ul className="mt-4 space-y-2">
        {node.techs.map((t) => (
          <li key={t.name} className="border-b border-border/70 pb-2 text-sm font-medium text-ink last:border-0">
            {t.name}
            <span className="ml-1 text-xs font-normal text-ink-muted">— {t.purpose}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
