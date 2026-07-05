import { createFileRoute } from "@tanstack/react-router";
import Landing from "@/components/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Renoide — Websites, Apps, AI Agents & Automation" },
      {
        name: "description",
        content:
          "Renoide builds websites, apps, AI agents and automation systems that help startups and businesses launch faster and scale smarter.",
      },
      { property: "og:title", content: "Renoide — Websites, Apps, AI Agents & Automation" },
      {
        property: "og:description",
        content:
          "A modern technology agency for startups and businesses. Custom websites, apps, AI agents and automation.",
      },
      { property: "og:image", content: "/renoide-logo.png" },
      { name: "twitter:image", content: "/renoide-logo.png" },
    ],
  }),
  component: Landing,
});
