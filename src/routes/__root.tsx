import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Renoide — Websites, Apps, AI Agents & Automation" },
      {
        name: "description",
        content:
          "Renoide is a modern technology agency building websites, apps, AI agents and automation systems that help startups and businesses grow faster.",
      },
      { name: "author", content: "Renoide" },
      { name: "keywords", content: "Renoide, AI agency India, software development, AI agents, automation, web apps, Arpit Upadhyay, Chitransh Singh Rathaur, Kaustubh Srivastava, AI founder India, automation expert, software architect, product strategist" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Renoide — Websites, Apps, AI Agents & Automation" },
      {
        property: "og:description",
        content:
          "We help startups and businesses launch faster, automate smarter, and scale efficiently through custom software solutions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://renoide.in" },
      { property: "og:image", content: "https://renoide.in/og-image.png" },
      { property: "og:site_name", content: "Renoide" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Renoide — Websites, Apps, AI Agents & Automation" },
      { name: "twitter:description", content: "Modern technology agency building websites, apps, AI agents & automation systems for startups and businesses." },
      { name: "twitter:image", content: "https://renoide.in/og-image.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "https://renoide.in" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", href: "/favicon-32x32.png", sizes: "32x32" },
      { rel: "icon", type: "image/png", href: "/favicon-16x16.png", sizes: "16x16" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://renoide.in/#organization",
      name: "Renoide",
      url: "https://renoide.in",
      logo: "https://renoide.in/renoide-logo.png",
      description: "Modern technology agency building websites, apps, AI agents and automation systems for startups and businesses worldwide.",
      foundingLocation: { "@type": "Country", name: "India" },
      sameAs: [
        "https://www.linkedin.com/company/renoide/",
        "https://www.instagram.com/renoideglobal/",
      ],
      contactPoint: { "@type": "ContactPoint", email: "hello@renoide.com", contactType: "customer support" },
      member: [
        { "@id": "https://renoide.in/founders/arpit-upadhyay" },
        { "@id": "https://renoide.in/founders/chitransh-singh-rathaur" },
        { "@id": "https://renoide.in/founders/kaustubh-srivastava" },
      ],
    },
    {
      "@type": "Person",
      "@id": "https://renoide.in/founders/arpit-upadhyay",
      name: "Arpit Upadhyay",
      jobTitle: "CEO & CTO",
      description: "Technical architect and CEO/CTO of Renoide. Expert in AI systems, software architecture, intelligent automation, and scalable product strategy.",
      image: "https://renoide.in/renoide-logo.png",
      url: "https://renoide.in/founders/arpit-upadhyay",
      worksFor: { "@id": "https://renoide.in/#organization" },
      knowsAbout: ["AI Systems", "Software Architecture", "Product Strategy", "Automation Infrastructure", "Business Leadership"],
      sameAs: [
        "https://www.linkedin.com/in/arpit-upadhayay-281407381/",
        "https://www.instagram.com/arpit_upadhyay_77/",
        "https://github.com/MrAusil",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://renoide.in/founders/chitransh-singh-rathaur",
      name: "Chitransh Singh Rathour",
      jobTitle: "CFO & COO",
      description: "CFO & COO of Renoide. Specialist in operations management, financial strategy, process optimization, and organizational scaling.",
      url: "https://renoide.in/founders/chitransh-singh-rathaur",
      worksFor: { "@id": "https://renoide.in/#organization" },
      knowsAbout: ["Operations Management", "Financial Strategy", "Process Optimization", "Business Development", "Organizational Scaling"],
      sameAs: [
        "https://www.linkedin.com/in/chitransh-singh-rathour-279b94352/",
        "https://www.instagram.com/thakur.chitransh.singh/",
        "https://github.com/ChitranshSingh",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://renoide.in/founders/kaustubh-srivastava",
      name: "Kaustubh Srivastava",
      jobTitle: "CPO & CMO",
      description: "CPO & CMO of Renoide. Expert in product design, marketing strategy, user experience, brand development, and customer engagement.",
      url: "https://renoide.in/founders/kaustubh-srivastava",
      worksFor: { "@id": "https://renoide.in/#organization" },
      knowsAbout: ["Product Design", "Marketing Strategy", "User Experience", "Brand Development", "Customer Engagement"],
      sameAs: [
        "https://www.linkedin.com/in/kaustubh-srivastava-587a68400/",
        "https://www.instagram.com/the_aeacus/",
        "https://github.com/Kaustubhsrivastava35",
      ],
    },
  ],
};

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Google Analytics (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-25KRS3KY6T" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-25KRS3KY6T');
            `
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem("renoide-theme");
                const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
                const initial = stored ? stored === "dark" : prefers;
                if (initial) {
                  document.documentElement.classList.add("dark");
                } else {
                  document.documentElement.classList.remove("dark");
                }
              })();
            `
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
