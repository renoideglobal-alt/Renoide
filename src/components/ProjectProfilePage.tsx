import { ArrowLeft, ExternalLink, Globe, Cpu, Sun, Moon } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import { useDarkMode } from "@/hooks/use-dark-mode";

export type ProjectProfile = {
  slug: string;
  title: string;
  category: string;
  tag: string;
  desc: string;
  image: string;
  tagline: string;
  description: string;
  industry: string;
  technologies: string[];
  liveUrl: string;
  primaryCTA: string;
  secondaryCTA: string;
  year: string;
  featured: boolean;
};

export default function ProjectProfilePage({ project }: { project: ProjectProfile }) {
  const { dark, toggle } = useDarkMode();
  const canonicalUrl = `https://renoide.in/work/${project.slug}`;

  // SoftwareApplication schema for Apps/AI, CreativeWork for Websites
  const isApp = project.category === "Apps" || project.category === "AI Solutions" || project.category === "Automation";
  
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": isApp ? "SoftwareApplication" : "CreativeWork",
    "@id": canonicalUrl,
    name: project.title,
    alternativeHeadline: project.tagline,
    description: project.description,
    url: canonicalUrl,
    genre: project.category,
    ...(isApp && {
      applicationCategory: project.category === "AI Solutions" ? "AIApplication" : "BusinessApplication",
      operatingSystem: "All",
    }),
    creator: {
      "@type": "Organization",
      "@id": "https://renoide.in/#organization",
      name: "Renoide",
      url: "https://renoide.in",
    },
    keywords: project.technologies.join(", "),
  };

  return (
    <>
      {/* Dynamic Custom Cursor */}
      <CustomCursor />

      {/* Dynamic Project Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />

      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
          <div className="container-x flex h-16 items-center justify-between gap-4">
            <a
              href="/#work"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
              aria-label="Back to Renoide work section"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Renoide
            </a>
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-2 text-ink transition-all hover:border-ink hover:-translate-y-0.5"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        <main>
          <article
            itemScope
            itemType={isApp ? "https://schema.org/SoftwareApplication" : "https://schema.org/CreativeWork"}
            className="container-x pb-24 pt-12 md:pt-20"
          >
            <div className="mx-auto max-w-4xl">
              {/* Main Grid Header */}
              <div className="grid gap-10 md:grid-cols-2 md:items-start">
                
                {/* Visual Preview */}
                <div className="w-full">
                  <div className="overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-[0_30px_70px_-20px_rgba(26,115,235,0.22)]">
                    <img
                      src={project.image}
                      alt={`${project.title} project interface preview`}
                      itemProp="image"
                      loading="eager"
                      width={1024}
                      height={768}
                      className="h-auto w-full object-cover aspect-[4/3] block"
                    />
                  </div>
                </div>

                {/* Project Details Panel */}
                <div className="flex flex-col">
                  {/* Category breadcrumb */}
                  <span className="mb-3 inline-flex items-center gap-1.5 self-start rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                    <span itemProp="genre">{project.category}</span>
                  </span>

                  <h1
                    itemProp="name"
                    className="font-display text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl"
                  >
                    {project.title}
                  </h1>

                  <p
                    itemProp="alternativeHeadline"
                    className="mt-3 text-lg font-medium text-ink-muted italic leading-relaxed"
                  >
                    "{project.tagline}"
                  </p>

                  {/* Metadata Stats */}
                  <div className="mt-6 grid grid-cols-2 gap-4 border-y border-border/80 py-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-muted">Industry</p>
                      <p className="mt-1 text-sm font-medium text-ink">{project.industry}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-muted">Year Delivered</p>
                      <p className="mt-1 text-sm font-medium text-ink">{project.year}</p>
                    </div>
                  </div>

                  {/* Live Redirect button */}
                  <div className="mt-8">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(17,17,17,0.35)]"
                    >
                      {project.secondaryCTA || "Visit Live Website"}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Full Description & Deep-dive */}
              <section aria-label="Project details" className="mt-16">
                <h2 className="font-display text-2xl font-bold text-ink">Project Overview</h2>
                <div
                  itemProp="description"
                  className="mt-4 text-base leading-relaxed text-ink-muted space-y-4"
                >
                  <p>{project.description}</p>
                </div>
              </section>

              {/* Technologies Stack */}
              <section aria-label="Technologies used" className="mt-12">
                <h2 className="mb-4 font-display text-xl font-semibold text-ink flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  Technologies & Tools
                </h2>
                <ul className="flex flex-wrap gap-2" role="list">
                  {project.technologies.map((tech) => (
                    <li key={tech}>
                      <span className="inline-block rounded-full border border-border bg-surface-2 px-3.5 py-1.5 text-xs font-semibold text-ink-muted hover:text-ink hover:border-ink/30 transition-colors">
                        {tech}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Backing Organization affiliation */}
              <section
                aria-label="Development Agency"
                className="mt-16 rounded-3xl border border-border bg-surface-2 p-7 md:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Globe className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">Developed by Renoide</h3>
                    <p className="text-xs text-ink-muted">AI-first technology partner</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  We build custom software, performant web applications, responsive websites, intelligent AI agents, and custom workflow automations that scale.
                </p>
                <a
                  href="https://renoide.in"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  View Agency Profile <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
                </a>
              </section>
            </div>
          </article>
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-8">
          <div className="container-x text-center text-xs text-ink-muted">
            <p>
              © 2026{" "}
              <a href="https://renoide.in" className="font-medium text-ink hover:text-primary">
                Renoide
              </a>
              . All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
