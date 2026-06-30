import { Linkedin, Instagram, Github, ArrowLeft, ExternalLink } from "lucide-react";

export type FounderProfile = {
  slug: string;
  name: string;
  role: string;
  image: string;
  intro: string;
  skills: string[];
  linkedin: string;
  instagram: string;
  github: string;
  keywords: string;
  description: string;
};

export default function FounderProfilePage({ founder }: { founder: FounderProfile }) {
  const canonicalUrl = `https://renoide.com/founders/${founder.slug}`;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": canonicalUrl,
    name: founder.name,
    jobTitle: founder.role,
    description: founder.description,
    url: canonicalUrl,
    worksFor: {
      "@type": "Organization",
      "@id": "https://renoide.com/#organization",
      name: "Renoide",
      url: "https://renoide.com",
    },
    knowsAbout: founder.skills,
    sameAs: [founder.linkedin, founder.instagram, founder.github],
  };

  return (
    <>
      {/* Inline JSON-LD per-page Person schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="min-h-screen bg-background">
        {/* Back nav */}
        <nav className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
          <div className="container-x flex h-16 items-center gap-4">
            <a
              href="/#founders"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
              aria-label="Back to Renoide founders section"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Renoide
            </a>
          </div>
        </nav>

        <main>
          <article
            itemScope
            itemType="https://schema.org/Person"
            className="container-x pb-24 pt-16 md:pt-24"
          >
            <div className="mx-auto max-w-3xl">
              {/* Header */}
              <header className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
                {/* Portrait */}
                <div className="w-full shrink-0 md:w-64">
                  <div className="overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-[0_30px_60px_-20px_rgba(26,115,235,0.18)]">
                    <img
                      src={founder.image}
                      alt={`Portrait of ${founder.name} — ${founder.role} at Renoide`}
                      itemProp="image"
                      loading="eager"
                      width={512}
                      height={512}
                      style={{ objectFit: "cover", objectPosition: "center 15%", display: "block", width: "100%", aspectRatio: "1/1" }}
                    />
                  </div>
                </div>

                {/* Identity */}
                <div className="flex-1">
                  {/* Org breadcrumb */}
                  <a
                    href="https://renoide.com"
                    itemProp="worksFor"
                    itemScope
                    itemType="https://schema.org/Organization"
                    className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-ink-muted transition-colors hover:text-ink"
                  >
                    <span itemProp="name">Renoide</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>

                  <h1
                    itemProp="name"
                    className="font-display text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl"
                  >
                    {founder.name}
                  </h1>

                  <p
                    itemProp="jobTitle"
                    className="mt-2 text-base font-semibold text-primary"
                  >
                    {founder.role}
                  </p>

                  {/* Social icons */}
                  <div className="mt-5 flex items-center gap-3">
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      itemProp="sameAs"
                      aria-label={`${founder.name} on LinkedIn`}
                      className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-2 text-ink-muted transition-all hover:-translate-y-0.5 hover:border-[#0a66c2]/60 hover:bg-[#0a66c2]/10 hover:text-[#4fa3e8] hover:shadow-[0_0_16px_rgba(10,102,194,0.3)]"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href={founder.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      itemProp="sameAs"
                      aria-label={`${founder.name} on Instagram`}
                      className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-2 text-ink-muted transition-all hover:-translate-y-0.5 hover:border-[#e1306c]/60 hover:bg-[#e1306c]/10 hover:text-[#f472b6] hover:shadow-[0_0_16px_rgba(225,48,108,0.3)]"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                    <a
                      href={founder.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      itemProp="sameAs"
                      aria-label={`${founder.name} on GitHub`}
                      className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-2 text-ink-muted transition-all hover:-translate-y-0.5 hover:border-ink/40 hover:bg-ink/5 hover:text-ink hover:shadow-[0_0_12px_rgba(0,0,0,0.15)]"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </header>

              {/* Divider */}
              <div
                aria-hidden
                className="my-10 h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(26,115,235,0.5) 0%, rgba(52,199,85,0.3) 50%, transparent 100%)",
                }}
              />

              {/* Bio */}
              <section aria-label="Biography">
                <h2 className="mb-4 font-display text-xl font-semibold text-ink">About</h2>
                <p
                  itemProp="description"
                  className="text-base leading-relaxed text-ink-muted"
                >
                  {founder.intro}
                </p>
              </section>

              {/* Skills */}
              <section aria-label="Areas of expertise" className="mt-10">
                <h2 className="mb-4 font-display text-xl font-semibold text-ink">Expertise</h2>
                <ul className="flex flex-wrap gap-2" role="list">
                  {founder.skills.map((s) => (
                    <li key={s}>
                      <span
                        itemProp="knowsAbout"
                        className="inline-block rounded-full border border-border bg-surface-2 px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Renoide affiliation */}
              <section
                aria-label="Company affiliation"
                className="mt-10 rounded-3xl border border-border bg-surface-2 p-6"
              >
                <h2 className="font-display text-base font-semibold text-ink">
                  Co-Founder at Renoide
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Renoide is a modern technology agency based in India, building websites, web
                  apps, mobile apps, AI agents and automation systems for startups and businesses
                  worldwide.
                </p>
                <a
                  href="https://renoide.com"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Visit Renoide <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </section>
            </div>
          </article>
        </main>

        {/* Minimal footer */}
        <footer className="border-t border-border py-8">
          <div className="container-x text-center text-xs text-ink-muted">
            <p>
              © 2026{" "}
              <a href="https://renoide.com" className="font-medium text-ink hover:text-primary">
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
