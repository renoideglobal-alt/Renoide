import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Brain,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  Globe,
  Handshake,
  LayoutDashboard,
  Linkedin,
  Mail,
  MapPin,
  Minus,
  Moon,
  Phone,
  Plus,
  Quote,
  Rocket,
  Send,
  Smartphone,
  Sparkles,
  Star,
  Sun,
  Workflow,
  X,
  Zap,
  Github,
  Instagram,
  Twitter,
} from "lucide-react";
import heroImg from "@/assets/hero-illustration.png";
import projFinflow from "@/assets/project-finflow.jpg";
import projMedconnect from "@/assets/project-medconnect.jpg";
import projRealtyhub from "@/assets/project-realtyhub.jpg";
import projAiagent from "@/assets/project-aiagent.jpg";
import projTaskpilot from "@/assets/project-taskpilot.jpg";
import projStartupos from "@/assets/project-startupos.jpg";
import founderArpit from "@/assets/founder-arpit.jpg";
import founderChitransh from "@/assets/founder-chitransh.jpg";
import founderKaustubh from "@/assets/founder-kaustubh.jpg";
import testimonialPriya from "@/assets/testimonial-priya.jpg";
import testimonialDaniel from "@/assets/testimonial-daniel.jpg";
import testimonialAnanya from "@/assets/testimonial-ananya.jpg";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import TrustLogos from "@/components/TrustLogos";
import RenoideLogo from "@/components/RenoideLogo";
import TechEcosystem from "@/components/TechEcosystem";


/* ----------------------------- helpers ----------------------------- */

function useInView<T extends HTMLElement>(opts: IntersectionObserverInit = { threshold: 0.2 }) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, opts);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref, inView };
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("renoide-theme");
    const prefers = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initial = stored ? stored === "dark" : !!prefers;
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);
  const toggle = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("renoide-theme", next ? "dark" : "light");
      return next;
    });
  };
  return { dark, toggle };
}

/* ----------------------------- nav ----------------------------- */

function Nav({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#founders", label: "Founders" },
    { href: "#process", label: "Process" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" aria-label="Renoide home" className="flex items-center">
          <RenoideLogo variant="lockup" />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-ink-muted transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-2 text-ink transition-all hover:border-ink hover:-translate-y-0.5"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            Book a call <ArrowRight className="h-4 w-4" />
          </a>
          <button
            className="md:hidden rounded-md border border-border p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-x flex flex-col gap-4 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-background"
            >
              Book a call <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ----------------------------- hero ----------------------------- */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[480px] w-[480px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--brand-2), transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-20 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl animate-glow-pulse"
        style={{ background: "radial-gradient(closest-side, var(--brand), transparent)" }}
      />
      <div className="container-x flex flex-col items-center justify-between gap-12 py-16 md:py-28 lg:flex-row lg:gap-16">
        <div className="w-full animate-fade-up lg:w-1/2 lg:max-w-[620px]">
          <p className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-px w-8 bg-ink-muted" /> Hello, we are
          </p>
          <h1 className="font-display text-6xl font-bold leading-[0.95] tracking-tight text-ink md:text-8xl">
            Renoide<span className="text-primary">.</span>
          </h1>
          <p className="mt-6 max-w-xl font-display text-2xl font-medium leading-tight text-ink md:text-3xl">
            Building powerful websites, apps, AI agents & automations for modern businesses.
          </p>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted">
            We help startups and businesses launch faster, automate smarter, and scale efficiently
            through custom software solutions.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              data-cursor="hover"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-background shadow-[0_10px_30px_-10px_rgba(91,108,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(91,108,255,0.65)] active:scale-[0.98]"
            >
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "linear-gradient(135deg, #5B6CFF 0%, #8B7DFF 100%)" }}
              />
              <span className="relative">Book a free strategy call</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#work"
              data-cursor="hover"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface-2 px-7 py-3.5 text-sm font-medium text-ink transition-all hover:border-ink hover:-translate-y-0.5"
            >
              View our work
            </a>
          </div>
        </div>

        <div className="relative flex w-full items-center justify-center overflow-hidden pt-4 lg:w-1/2 lg:justify-end lg:pt-0">
          <div className="relative mx-auto aspect-square w-full max-w-[520px] p-4 sm:p-6 lg:mr-0 lg:max-w-[560px]">
            {/* Soft animated gradient glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-6 rounded-full opacity-60 blur-3xl animate-glow-pulse"
              style={{
                background:
                  "conic-gradient(from 120deg, rgba(91,108,255,0.35), rgba(139,125,255,0.3), rgba(176,132,255,0.25), rgba(91,108,255,0.35))",
              }}
            />
            {/* Floating particles */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              {[
                { left: "12%", top: "70%", delay: "0s",   d: "6.5s" },
                { left: "78%", top: "20%", delay: "1.4s", d: "7.5s" },
                { left: "55%", top: "85%", delay: "2.8s", d: "8.5s" },
                { left: "30%", top: "30%", delay: "3.6s", d: "7s" },
                { left: "88%", top: "65%", delay: "4.2s", d: "9s" },
              ].map((p, i) => (
                <span
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full"
                  style={{
                    left: p.left,
                    top: p.top,
                    background: "linear-gradient(135deg, #5B6CFF, #8B7DFF)",
                    animation: `particle-rise ${p.d} ease-in ${p.delay} infinite`,
                  }}
                />
              ))}
            </div>
            <img
              src={heroImg}
              alt="Renoide product ecosystem"
              width={1024}
              height={1024}
              className="animate-floaty-slow relative h-auto max-h-full w-full max-w-full object-contain"
            />
            <div className="animate-floaty absolute left-2 top-6 hidden rounded-2xl border border-border bg-surface-2 px-4 py-3 shadow-[0_20px_50px_-30px_rgba(17,17,17,0.25)] sm:block">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Bot className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold text-ink">AI Agent</p>
                  <p className="text-[10px] text-ink-muted">Online · replying</p>
                </div>
              </div>
            </div>
            <div className="animate-floaty-slow absolute -right-2 bottom-10 hidden rounded-2xl border border-border bg-surface-2 px-4 py-3 shadow-[0_20px_50px_-30px_rgba(17,17,17,0.25)] sm:block">
              <p className="text-[10px] uppercase tracking-widest text-ink-muted">Automation</p>
              <p className="text-sm font-semibold text-ink">+38% leads / mo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ----------------------------- trust bar ----------------------------- */

const STATS = [
  { value: 50, suffix: "+", label: "Projects delivered" },
  { value: 20, suffix: "+", label: "Happy clients" },
  { value: 95, suffix: "%", label: "Client satisfaction" },
  { value: 4, suffix: "+", label: "Years experience" },
];

function TrustBar() {
  return (
    <section className="container-x -mt-2 pb-16 md:pb-24">
      <div className="grid grid-cols-2 gap-4 rounded-3xl border border-border bg-surface-2 p-6 md:grid-cols-4 md:p-8">
        {STATS.map((s) => (
          <div key={s.label} className="text-center md:text-left">
            <p className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
              <Counter to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-ink-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- services ----------------------------- */

type ServiceDetail = {
  icon: typeof Globe;
  title: string;
  desc: string;
  what: string[];
  process?: string[];
  stack?: string[];
  benefits: string[];
};

const SERVICES: ServiceDetail[] = [
  {
    icon: Globe,
    title: "Website Development",
    desc: "Business websites, landing pages, corporate sites and portfolios that convert.",
    what: ["Business websites", "Landing pages", "E-commerce stores", "Portfolios", "Corporate websites"],
    process: ["Research", "Wireframing", "UI Design", "Development", "Launch"],
    benefits: ["Faster conversion", "Better branding", "Mobile optimized", "SEO ready"],
  },
  {
    icon: LayoutDashboard,
    title: "Web Applications",
    desc: "Custom dashboards, SaaS platforms and internal tools built for scale.",
    what: ["SaaS platforms", "Dashboards", "CRM systems", "Client portals", "Internal tools"],
    stack: ["React", "Next.js", "Node.js", "Supabase"],
    benefits: ["Scalable architecture", "Secure systems", "Fast performance"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Beautiful iOS and Android apps with a single shared codebase.",
    what: ["Android apps", "iOS apps", "Cross-platform apps"],
    process: ["Design", "Prototype", "Development", "Testing", "Launch"],
    benefits: ["Native performance", "Single codebase", "App Store ready"],
  },
  {
    icon: Bot,
    title: "AI Agents",
    desc: "Custom AI assistants for support, sales and operations — trained on your data.",
    what: ["Customer support agents", "Sales assistants", "Lead qualification agents", "Internal AI assistants"],
    process: ["Customer Message", "AI Analysis", "Response Generation", "CRM Update", "Human Escalation"],
    benefits: ["24/7 availability", "Trained on your data", "Multi-channel"],
  },
  {
    icon: Workflow,
    title: "Business Automation",
    desc: "Automate repetitive workflows across tools and reclaim hundreds of hours.",
    what: ["Lead automation", "Email automation", "CRM automation", "Internal workflow automation"],
    benefits: ["Save 100+ hours / month", "Zero manual errors", "Real-time sync"],
  },
  {
    icon: Sparkles,
    title: "UI/UX Design",
    desc: "Research-led product design that users genuinely love using.",
    what: ["Wireframes", "User flows", "Design systems", "Interactive prototypes"],
    process: ["Research", "Wireframe", "Visual Design", "Prototype", "Handoff"],
    benefits: ["Higher engagement", "Lower churn", "Consistent brand"],
  },
];

function Services({ onLearn }: { onLearn: (s: ServiceDetail) => void }) {
  return (
    <section id="services" className="border-t border-border bg-background py-24 md:py-32">
      <div className="container-x">
        <SectionHead eyebrow="Our services" title="Everything you need to build and scale digitally." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <article
              key={s.title}
              data-cursor="hover"
              data-cursor-text="Learn more"
              onClick={() => onLearn(s)}
              className="reveal group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-surface-2 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-ink hover:shadow-[0_40px_70px_-30px_rgba(17,17,17,0.22)]"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                style={{ background: "linear-gradient(135deg, #5B6CFF, #8B7DFF)" }}
              />
              <div className="relative flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-ink group-hover:text-background">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-medium text-ink-muted">0{i + 1}</span>
              </div>
              <h3 className="relative mt-6 font-display text-xl font-semibold text-ink">{s.title}</h3>
              <p className="relative mt-3 text-sm leading-relaxed text-ink-muted">{s.desc}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLearn(s);
                }}
                className="relative mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-ink"
              >
                Learn more
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </article>
          ))}

        </div>
      </div>
    </section>
  );
}

/* ----------------------------- service modal ----------------------------- */

function ServiceModal({ service, onClose }: { service: ServiceDetail | null; onClose: () => void }) {
  useEffect(() => {
    if (!service) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [service, onClose]);

  if (!service) return null;
  const Icon = service.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8" role="dialog" aria-modal="true">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm animate-fade-up"
      />
      <div
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-background shadow-[0_40px_100px_-20px_rgba(0,0,0,0.45)] animate-fade-up"
        style={{ animationDuration: "0.35s" }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-background/95 px-7 py-5 backdrop-blur">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-ink-muted">Service</p>
              <h3 className="font-display text-xl font-semibold text-ink">{service.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-ink hover:border-ink"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-10 px-7 py-8 md:px-10 md:py-10">
          <p className="text-base leading-relaxed text-ink-muted">{service.desc}</p>

          <ModalBlock title="What we build">
            <div className="flex flex-wrap gap-2">
              {service.what.map((x) => (
                <span
                  key={x}
                  className="rounded-full border border-border bg-surface-2 px-3.5 py-1.5 text-xs font-medium text-ink"
                >
                  {x}
                </span>
              ))}
            </div>
          </ModalBlock>

          {service.process && (
            <ModalBlock title="Our process">
              <ol className="flex flex-wrap items-center gap-2">
                {service.process.map((p, i) => (
                  <li key={p} className="flex items-center gap-2">
                    <span className="rounded-xl bg-surface-2 border border-border px-3.5 py-2 text-sm font-medium text-ink">
                      <span className="text-ink-muted mr-2 text-xs">0{i + 1}</span>
                      {p}
                    </span>
                    {i < service.process!.length - 1 && (
                      <ArrowRight className="h-3.5 w-3.5 text-ink-muted" />
                    )}
                  </li>
                ))}
              </ol>
            </ModalBlock>
          )}

          {service.stack && (
            <ModalBlock title="Tech stack">
              <div className="flex flex-wrap gap-2">
                {service.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-ink px-3.5 py-1.5 text-xs font-medium text-background"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </ModalBlock>
          )}

          <ModalBlock title="Benefits">
            <ul className="grid gap-3 sm:grid-cols-2">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-ink">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </ModalBlock>

          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            Discuss your project <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function ModalBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">{title}</p>
      {children}
    </div>
  );
}

/* ----------------------------- section head ----------------------------- */

function SectionHead({
  eyebrow,
  title,
  align = "center",
  inverted = false,
}: {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
  inverted?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p
        className={`mb-4 text-xs font-semibold uppercase tracking-[0.22em] ${
          inverted ? "text-background/60" : "text-ink-muted"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl ${
          inverted ? "text-background" : "text-ink"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

/* ----------------------------- why renoide trust ----------------------------- */

const TRUST = [
  { icon: Rocket, title: "Fast Delivery", desc: "Launch quickly without compromising on quality or detail." },
  { icon: LayoutDashboard, title: "Scalable Systems", desc: "Built for growth from day one — ready for millions of users." },
  { icon: Brain, title: "AI-First Approach", desc: "Future-ready solutions powered by modern AI and automation." },
  { icon: Handshake, title: "Long-Term Partnership", desc: "Support and iteration that continues long after launch day." },
];

function WhyTrust() {
  return (
    <section className="border-t border-border bg-surface py-24 md:py-32">
      <div className="container-x">
        <SectionHead eyebrow="Why Renoide" title="Why businesses trust Renoide." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t, i) => (
            <article
              key={t.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface-2 p-7 transition-all hover:-translate-y-1 hover:border-ink hover:shadow-[0_30px_60px_-30px_rgba(17,17,17,0.18)]"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <t.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 font-display text-lg font-semibold text-ink">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- process ----------------------------- */

const STEPS = [
  { n: "01", t: "Discovery & strategy", d: "We map goals, audience and constraints into a sharp plan." },
  { n: "02", t: "Design & planning", d: "Wireframes, UI direction and a clear delivery roadmap." },
  { n: "03", t: "Development & integration", d: "We ship in fast iterations with weekly demos." },
  { n: "04", t: "Launch & growth", d: "Go-live, analytics and continuous improvement." },
];

function Process() {
  return (
    <section id="process" className="border-t border-border bg-background py-24 md:py-32">
      <div className="container-x">
        <SectionHead eyebrow="How we work" title="A clear, proven process from idea to launch." />
        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
          />
          <div className="grid gap-10 md:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="relative">
                <div className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-border bg-surface-2 font-display text-sm font-semibold text-ink">
                  {s.n}
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-ink">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- portfolio ----------------------------- */

type Category = "All" | "Websites" | "Apps" | "AI Solutions" | "Automation";

const PROJECTS: { title: string; category: Exclude<Category, "All">; tag: string; desc: string; image: string }[] = [
  {
    title: "FinFlow",
    category: "Apps",
    tag: "Fintech Dashboard",
    desc: "A real-time analytics dashboard for a fintech startup.",
    image: projFinflow,
  },
  {
    title: "MedConnect",
    category: "Apps",
    tag: "Healthcare App",
    desc: "Patient-doctor booking and records on iOS & Android.",
    image: projMedconnect,
  },
  {
    title: "AI Support Agent",
    category: "AI Solutions",
    tag: "Customer Support",
    desc: "Resolves 70% of tickets automatically across channels.",
    image: projAiagent,
  },
  {
    title: "RealtyHub",
    category: "Websites",
    tag: "Real Estate",
    desc: "Editorial property listings with search and CMS.",
    image: projRealtyhub,
  },
  {
    title: "TaskPilot",
    category: "Automation",
    tag: "Workflow Platform",
    desc: "No-code workflow automation across 50+ business tools.",
    image: projTaskpilot,
  },
  {
    title: "StartupOS",
    category: "Apps",
    tag: "Internal Ops Dashboard",
    desc: "A single pane of glass for finance, HR and product teams.",
    image: projStartupos,
  },
];

const FILTERS: Category[] = ["All", "Websites", "Apps", "AI Solutions", "Automation"];

function Portfolio() {
  const [filter, setFilter] = useState<Category>("All");
  const visible = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  return (
    <section id="work" className="border-t border-border bg-surface py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
              Selected projects
            </p>
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-5xl">
              Work that ships, scales and sells.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  filter === f
                    ? "border-ink bg-ink text-background"
                    : "border-border bg-surface-2 text-ink-muted hover:text-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <article
              key={p.title}
              data-cursor="hover"
              data-cursor-text="View project"
              className="reveal group overflow-hidden rounded-2xl border border-border bg-surface-2 transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/40 hover:shadow-[0_40px_80px_-30px_rgba(17,17,17,0.28)]"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                <img
                  src={p.image}
                  alt={`${p.title} project preview`}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Dark overlay reveal */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-end p-6">
                  <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur transition-transform duration-500 group-hover:-translate-y-14">
                    {p.category}
                  </span>
                </div>
                {/* Hover content */}
                <div className="absolute inset-x-0 bottom-0 translate-y-3 px-6 pb-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm leading-relaxed text-background/90">{p.desc}</p>
                  <a
                    href="#contact"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-background px-4 py-2 text-xs font-medium text-ink shadow-lg"
                  >
                    View project <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
              <div className="flex items-start justify-between gap-4 p-6">
                <div>
                  <p className="text-xs text-ink-muted">{p.tag}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-ink transition-transform duration-300 group-hover:-translate-y-0.5">
                    {p.title}
                  </h3>
                </div>
                <a
                  href="#contact"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-ink transition-all duration-300 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-background"
                  aria-label={`View ${p.title}`}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}

        </div>
      </div>
    </section>
  );
}

/* ----------------------------- AI showcase ----------------------------- */

const FLOW = [
  { t: "Lead captured", d: "Form, ad, or chat", icon: Zap },
  { t: "AI qualification", d: "Scores intent & fit", icon: Brain },
  { t: "CRM update", d: "Synced in real time", icon: LayoutDashboard },
  { t: "Email follow-up", d: "Personalised reply", icon: Mail },
  { t: "Sales notified", d: "Hot leads only", icon: Bot },
];

function AIShowcase() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-background md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(91,108,255,0.4), transparent 50%), radial-gradient(circle at 80% 60%, rgba(123,92,255,0.3), transparent 50%)",
        }}
      />
      <div className="container-x relative">
        <SectionHead
          inverted
          eyebrow="AI & automation"
          title="AI solutions that work while you sleep."
        />
        <div className="mt-16 grid gap-4 md:grid-cols-5">
          {FLOW.map((f, i) => (
            <div key={f.t} className="relative">
              <div className="rounded-2xl border border-background/15 bg-background/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                    <f.icon className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-semibold tracking-widest text-background/60">
                    STEP {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{f.t}</h3>
                <p className="mt-1 text-sm text-background/60">{f.d}</p>
              </div>
              {i < FLOW.length - 1 && (
                <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-background px-7 py-3.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
          >
            Automate my business
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- founders ----------------------------- */

const FOUNDERS = [
  {
    name: "Arpit Upadhyay",
    role: "CEO & CTO",
    image: founderArpit,
    desc: "Leads Renoide's technology vision, product innovation, AI strategy and overall company direction.",
    skills: ["AI Systems", "Software Architecture", "Product Strategy", "Business Leadership"],
    linkedin: "#",
  },
  {
    name: "Chitransh Singh Rathour",
    role: "CFO & COO",
    image: founderChitransh,
    desc: "Oversees business operations, financial planning, execution strategy and organizational growth.",
    skills: ["Operations Management", "Financial Strategy", "Process Optimization", "Business Development"],
    linkedin: "#",
  },
  {
    name: "Kaustubh Srivastava",
    role: "CPO & CMO",
    image: founderKaustubh,
    desc: "Leads product experience, design strategy, customer engagement, marketing and brand development.",
    skills: ["Product Design", "Marketing Strategy", "User Experience", "Brand Development"],
    linkedin: "#",
  },
];

function Founders() {
  return (
    <section id="founders" className="border-t border-border bg-background py-24 md:py-32">
      <div className="container-x">
        <SectionHead eyebrow="Meet the founders" title="The minds behind Renoide." />
        <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-ink-muted">
          We combine development, design, AI, and business strategy to build exceptional digital
          products for ambitious teams.
        </p>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {FOUNDERS.map((f, idx) => (
            <article
              key={f.name}
              data-cursor="hover"
              className="reveal group relative overflow-hidden rounded-3xl border border-border bg-surface-2 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/60 hover:shadow-[0_50px_90px_-40px_rgba(91,108,255,0.35)]"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(91,108,255,0.18), transparent 40%, rgba(139,125,255,0.18))",
                }}
              />
              <div className="relative mb-6 aspect-square overflow-hidden rounded-2xl bg-surface">
                <img
                  src={f.image}
                  alt={`Portrait of ${f.name}`}
                  loading="lazy"
                  width={768}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <a
                  href={f.linkedin}
                  aria-label={`${f.name} on LinkedIn`}
                  data-cursor="hover"
                  className="absolute right-3 top-3 grid h-10 w-10 translate-y-1 place-items-center rounded-full bg-background/90 text-ink opacity-0 backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
              <h3 className="relative font-display text-xl font-semibold text-ink">{f.name}</h3>
              <p className="relative mt-1 text-sm font-medium text-primary">{f.role}</p>
              <p className="relative mt-3 text-sm leading-relaxed text-ink-muted">{f.desc}</p>
              <div className="relative mt-5 flex flex-wrap gap-2">
                {f.skills.map((s, k) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium text-ink transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:text-primary"
                    style={{ transitionDelay: `${k * 40}ms` }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}

        </div>
      </div>
    </section>
  );
}

/* ----------------------------- testimonials ----------------------------- */

const REVIEWS = [
  {
    quote:
      "Renoide rebuilt our entire customer portal in 6 weeks. The new platform is faster, cleaner and our NPS jumped 22 points.",
    name: "Priya Menon",
    role: "Head of Product",
    company: "Northwind Health",
    image: testimonialPriya,
    rating: 5,
  },
  {
    quote:
      "Their AI agent now handles 70% of our inbound support. Easily the highest-ROI engineering investment we've ever made.",
    name: "Daniel Brooks",
    role: "Founder & CEO",
    company: "FinFlow",
    image: testimonialDaniel,
    rating: 5,
  },
  {
    quote:
      "From discovery to launch, the team felt like part of ours. Smart, calm, and incredibly fast — exactly what a scaling startup needs.",
    name: "Ananya Rao",
    role: "COO",
    company: "TaskPilot",
    image: testimonialAnanya,
    rating: 5,
  },
];

function Testimonials() {
  return (
    <section className="border-t border-border bg-surface py-24 md:py-32">
      <div className="container-x">
        <SectionHead eyebrow="Testimonials" title="What our clients say about working with us." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <figure
              key={r.name}
              data-cursor="hover"
              className="reveal group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-2 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:scale-[1.01] hover:border-ink/70 hover:shadow-[0_40px_70px_-30px_rgba(17,17,17,0.22)]"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-3 -top-3 text-ink/5 transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-110 group-hover:text-primary/30"
              >
                <Quote className="h-24 w-24" strokeWidth={1} />
              </span>
              <div className="relative flex items-center gap-1 text-primary">
                {Array.from({ length: r.rating }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="relative mt-5 font-display text-lg font-medium leading-snug text-ink">
                “{r.quote}”
              </blockquote>
              <figcaption className="relative mt-8 flex items-center gap-4 border-t border-border pt-6">
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-background">
                  <img
                    src={r.image}
                    alt={`Portrait of ${r.name}`}
                    loading="lazy"
                    width={768}
                    height={768}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">{r.name}</p>
                  <p className="text-xs text-ink-muted">
                    {r.role} · {r.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ----------------------------- tech stack ----------------------------- */

const STACK: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript"] },
  { group: "Backend", items: ["Node.js", "Python", "Supabase"] },
  { group: "Mobile", items: ["Flutter", "React Native"] },
  { group: "AI", items: ["OpenAI", "LangChain", "Vector DBs"] },
  { group: "Cloud", items: ["AWS", "Vercel"] },
];

function TechStack() {
  return (
    <section className="border-t border-border bg-background py-24 md:py-32">
      <div className="container-x">
        <SectionHead
          eyebrow="Technology stack"
          title="Modern tools, picked for the job — not the trend."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STACK.map((g) => (
            <div key={g.group} className="rounded-2xl border border-border bg-surface-2 p-6">
              <div className="flex items-center gap-2 text-ink-muted">
                <Code2 className="h-4 w-4" />
                <p className="text-xs font-semibold uppercase tracking-widest">{g.group}</p>
              </div>
              <ul className="mt-4 space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="flex items-center justify-between border-b border-border/70 pb-2 text-sm font-medium text-ink last:border-0">
                    {it}
                    <Cpu className="h-3.5 w-3.5 text-ink-muted" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- FAQ ----------------------------- */

const FAQS = [
  {
    q: "How long does a typical project take?",
    a: "Most landing sites ship in 2–3 weeks, full web apps in 6–10 weeks, and AI agents in 3–5 weeks. We share a clear roadmap during discovery.",
  },
  {
    q: "Do you build custom AI agents?",
    a: "Yes — support agents, sales agents, internal copilots and more, trained on your data and integrated with your existing tools.",
  },
  {
    q: "Can you automate our existing workflows?",
    a: "Absolutely. We audit your current stack and build automations that connect your CRM, email, databases and operations tools.",
  },
  {
    q: "Do you provide ongoing maintenance?",
    a: "Yes. We offer monthly care plans for monitoring, updates, performance and continuous feature delivery.",
  },
  {
    q: "How much does a project cost?",
    a: "Projects typically start at ₹25k for landing sites and ₹1L+ for apps and AI systems. Share your scope and we'll send a tailored proposal in 48 hours.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-t border-border bg-surface py-24 md:py-32">
      <div className="container-x grid gap-12 md:grid-cols-[1fr_2fr] md:gap-16">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">FAQ</p>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-5xl">
            Questions, answered.
          </h2>
          <p className="mt-5 text-ink-muted">
            Don't see what you're looking for?{" "}
            <a href="#contact" className="text-ink underline underline-offset-4">
              Ask us directly
            </a>
            .
          </p>
        </div>
        <ul className="divide-y divide-border border-y border-border">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-lg font-medium text-ink">{f.q}</span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                {isOpen && (
                  <p className="-mt-2 pb-6 pr-12 text-sm leading-relaxed text-ink-muted">{f.a}</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------- final CTA ----------------------------- */

function FinalCTA() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container-x">
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-16 md:px-16 md:py-24 transition-colors duration-300
            bg-[linear-gradient(135deg,#111111_0%,#1c1c2e_60%,#2a1a4a_100%)] text-background
            dark:bg-none dark:bg-[#F4F0E8] dark:text-[#111111]
            dark:shadow-[0_50px_120px_-30px_rgba(26,115,235,0.45)] dark:ring-1 dark:ring-black/5"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
            style={{ background: "linear-gradient(135deg, #1A73EB, #34C755)" }}
          />
          <div className="relative max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-background/60 dark:text-[#111]/60">
              Let's build
            </p>
            <h2 className="font-display text-4xl font-bold leading-[1.05] md:text-6xl">
              Ready to build something exceptional?
            </h2>
            <p className="mt-6 max-w-xl text-base text-background/70 dark:text-[#111]/70 md:text-lg">
              Whether it's a website, app, AI agent, or business automation system, Renoide can help
              bring it to life.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all hover:-translate-y-0.5
                  bg-background text-ink
                  dark:bg-[linear-gradient(135deg,#5B6CFF_0%,#7B5CFF_100%)] dark:text-white dark:shadow-[0_15px_40px_-10px_rgba(91,108,255,0.6)]"
              >
                Book free consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-colors
                  border border-background/30 text-background hover:bg-background/10
                  dark:border-[#111]/20 dark:text-[#111] dark:hover:bg-[#111]/5"
              >
                Start your project
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- book-now call fallback ----------------------------- */

const PRIMARY_NUMBER = "+919140386492";
const SECONDARY_NUMBER = "+918572901073";
const FALLBACK_DELAY_MS = 12_000;

function BookNowButton({ className }: { className?: string }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [calling, setCalling] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const primaryBtnRef = useRef<HTMLButtonElement | null>(null);

  const handlePrimaryCall = () => {
    if (calling) return;
    if (debounceRef.current) return;
    setCalling(true);
    debounceRef.current = setTimeout(() => {
      debounceRef.current = null;
    }, 3000);
    window.location.href = `tel:${PRIMARY_NUMBER}`;
    fallbackTimerRef.current = setTimeout(() => {
      showFallbackModal();
    }, FALLBACK_DELAY_MS);
  };

  const showFallbackModal = () => {
    setCalling(false);
    setModalOpen(true);
  };

  const handleSecondaryCall = () => {
    setModalOpen(false);
    window.location.href = `tel:${SECONDARY_NUMBER}`;
  };

  const handleCancel = () => {
    setModalOpen(false);
    setCalling(false);
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  };

  // ESC key closes modal
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCancel();
    };
    window.addEventListener("keydown", onKey);
    // Auto-focus primary action button for keyboard nav
    primaryBtnRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  return (
    <>
      <button
        id="book-now-call-btn"
        onClick={handlePrimaryCall}
        disabled={calling}
        className={className}
        aria-label="Book a call — primary number"
      >
        {calling ? "Calling…" : "Book now"} <ArrowRight className="h-4 w-4" />
      </button>

      {/* Fallback Modal — rendered via portal-like fixed positioning */}
      {modalOpen && (
        <>
          {/* Layer 1: Backdrop — z-9998, clicks dismiss modal */}
          <div
            aria-hidden
            onClick={handleCancel}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9998,
              background: "rgba(0,0,0,0.62)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              cursor: "default",
              pointerEvents: "auto",
            }}
          />

          {/* Layer 2: Centering wrapper — z-9999, pointer-events only on children */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="fallback-modal-title"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              pointerEvents: "none", // pass-through; panel below re-enables
            }}
          >
            {/* Layer 3: Glass panel — z-10000, all pointer events active */}
            <div
              className="modal-scope relative w-full max-w-sm rounded-2xl p-7 text-center"
              style={{
                zIndex: 10000,
                pointerEvents: "auto",
                cursor: "default",
                isolation: "isolate",
                background: "linear-gradient(135deg, rgba(10,14,30,0.96) 0%, rgba(15,20,45,0.98) 100%)",
                border: "1px solid rgba(99,153,255,0.35)",
                boxShadow:
                  "0 0 0 1px rgba(99,153,255,0.12), 0 0 40px rgba(26,115,235,0.22), 0 24px 60px rgba(0,0,0,0.7)",
                animation: "modal-in 0.22s cubic-bezier(0.34,1.56,0.64,1) both",
              }}
            >
              {/* Glow blob — decorative only, no pointer capture */}
              <div
                aria-hidden
                style={{
                  pointerEvents: "none",
                  position: "absolute",
                  top: "-2.5rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  height: "6rem",
                  width: "10rem",
                  borderRadius: "9999px",
                  filter: "blur(40px)",
                  opacity: 0.4,
                  background: "radial-gradient(closest-side, rgba(26,115,235,0.6), transparent)",
                }}
              />

              {/* Icon ring */}
              <span
                style={{ cursor: "default" }}
                className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(26,115,235,0.15)] ring-1 ring-[rgba(26,115,235,0.35)]"
              >
                <Phone className="h-5 w-5 text-[#6395ff]" />
              </span>

              <h2
                id="fallback-modal-title"
                className="font-display text-lg font-bold tracking-tight text-white"
              >
                Couldn't connect
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[rgba(255,255,255,0.6)]">
                Would you like to try our alternate number?
              </p>

              <div className="mt-6 flex flex-col gap-3">
                {/* Primary action */}
                <button
                  id="try-alternate-number-btn"
                  ref={primaryBtnRef}
                  onClick={handleSecondaryCall}
                  style={{ cursor: "pointer", pointerEvents: "auto" }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1a73eb] px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#2481f5] hover:shadow-[0_8px_24px_rgba(26,115,235,0.45)] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6395ff]"
                >
                  <Phone className="h-4 w-4" />
                  Try Another Number
                </button>

                {/* Cancel */}
                <button
                  id="cancel-fallback-btn"
                  onClick={handleCancel}
                  style={{ cursor: "pointer", pointerEvents: "auto" }}
                  className="rounded-full border border-[rgba(255,255,255,0.12)] px-5 py-3 text-sm font-medium text-[rgba(255,255,255,0.55)] transition-all hover:border-[rgba(255,255,255,0.25)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6395ff]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes modal-in {
              from { opacity: 0; transform: scale(0.88); }
              to   { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </>
      )}
    </>
  );
}

/* ----------------------------- contact ----------------------------- */

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="border-t border-border bg-surface py-24 md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">Contact</p>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-5xl">
            Let's start a conversation.
          </h2>
          <p className="mt-6 max-w-md text-ink-muted">
            Tell us about your project. We typically reply within one business day with next steps.
          </p>
          <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface-2 px-4 py-2 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: "#34C755" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#34C755" }} />
            </span>
            <span className="font-medium text-ink">Typically responds within 24 hours</span>
          </div>
          <ul className="mt-8 space-y-5">
            <ContactItem icon={Mail} label="Email" value="hello@renoide.com" />
            <ContactItem icon={Phone} label="Phone" value="+91 85729 01073" />
            <ContactItem icon={Phone} label="Phone" value="+91 91403 86492" />
            <ContactItem icon={MapPin} label="Location" value="India · Working worldwide" />
          </ul>

          <div className="mt-10 rounded-3xl border border-border bg-surface-2 p-6 shadow-[0_30px_60px_-40px_rgba(17,17,17,0.25)]">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-base font-semibold text-ink">Free 30-min strategy call</p>
                <p className="text-xs text-ink-muted">No-pressure. Just a great conversation.</p>
              </div>
            </div>
            <BookNowButton className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed" />
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="rounded-3xl border border-border bg-surface-2 p-7 md:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" placeholder="Your name" />
            <Field label="Email" name="email" type="email" placeholder="you@company.com" />
            <Field label="Company" name="company" placeholder="Company (optional)" />
            <SelectField
              label="Project type"
              name="type"
              options={["Website", "Web App", "Mobile App", "AI Agent", "Automation", "UI/UX Design", "Other"]}
            />
            <SelectField
              label="Project budget"
              name="budget"
              options={["₹25k – ₹50k", "₹50k – ₹1L", "₹1L – ₹3L", "₹3L – ₹5L", "₹5L+"]}
              full
            />
            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-ink-muted">
                Message
              </label>
              <textarea
                required
                rows={5}
                placeholder="Tell us about your project, goals and timeline."
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            {sent ? "Thanks — we'll be in touch" : "Send message"}
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-center gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-ink">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-widest text-ink-muted">{label}</p>
        <p className="text-sm font-medium text-ink">{value}</p>
      </div>
    </li>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-ink-muted">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={name !== "company"}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  full,
}: {
  label: string;
  name: string;
  options: string[];
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-ink-muted">
        {label}
      </label>
      <select
        name={name}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

/* ----------------------------- footer ----------------------------- */

function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="container-x grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <a href="#top" aria-label="Renoide home" className="inline-flex items-center">
            <RenoideLogo variant="stacked" />
          </a>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
            Building websites, apps, AI agents and automation systems that grow modern businesses.
          </p>
        </div>
        <FooterCol title="Company" links={["Services", "Projects", "Founders", "Contact"]} />
        <FooterCol title="Services" links={["Websites", "Web Apps", "Mobile Apps", "AI Agents"]} />
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink-muted">Social</p>
          <div className="flex gap-2">
            {[
              { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/renoide/" },
              { icon: Twitter, label: "Twitter", href: "#" },
              { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/renoideglobal/?hl=en" },
              { icon: Github, label: "GitHub", href: "#" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(href !== "#" && { target: "_blank", rel: "noopener noreferrer" })}
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-ink transition-colors hover:border-ink hover:bg-ink hover:text-background"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="container-x mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-ink-muted md:flex-row md:items-center">
        <p>© 2026 Renoide. All rights reserved.</p>
        <p>Designed & built with care.</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink-muted">{title}</p>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-sm text-ink transition-colors hover:text-primary">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ----------------------------- page ----------------------------- */

export default function Landing() {
  const { dark, toggle } = useDarkMode();
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);

  // Global scroll-reveal controller — toggles `.is-visible` on `.reveal` elements.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <LoadingScreen />
      <CustomCursor />
      <Nav dark={dark} toggle={toggle} />
      <main>
        <Hero />
        <TrustBar />
        <TrustLogos />
        <div className="section-divider" aria-hidden />
        <Services onLearn={setActiveService} />
        <WhyTrust />
        <div className="section-divider" aria-hidden />
        <Process />
        <Portfolio />
        <AIShowcase />
        <div className="section-divider" aria-hidden />
        <Founders />
        <Testimonials />
        <TechEcosystem />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
    </div>

  );
}
