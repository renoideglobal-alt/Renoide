import { createFileRoute } from "@tanstack/react-router";
import FounderProfilePage from "@/components/FounderProfilePage";
import founderChitransh from "@/assets/founder-chitransh.jpg";

export const Route = createFileRoute("/founders/chitransh-singh-rathaur")({
  head: () => ({
    meta: [
      { title: "Chitransh Singh Rathour — CFO & COO at Renoide | Operations & Financial Strategy" },
      {
        name: "description",
        content:
          "Chitransh Singh Rathour is the CFO & COO of Renoide, an AI-first technology agency in India. Expert in operations management, financial planning, process optimization and organizational scaling.",
      },
      { name: "keywords", content: "Chitransh Singh Rathaur, Chitransh Singh Rathour, Renoide CFO, Renoide COO, operations management, financial strategy, business development, Renoide founder, process optimization" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Chitransh Singh Rathour — CFO & COO at Renoide" },
      {
        property: "og:description",
        content:
          "CFO & COO of Renoide. Specialist in operations excellence, financial strategy and organizational scaling for modern technology companies.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://renoide.com/founders/chitransh-singh-rathaur" },
      { property: "og:image", content: "https://renoide.com/og-image.png" },
      { property: "og:site_name", content: "Renoide" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Chitransh Singh Rathour — CFO & COO at Renoide" },
      { name: "twitter:description", content: "Operations & financial strategy expert and co-founder of Renoide." },
    ],
    links: [
      { rel: "canonical", href: "https://renoide.com/founders/chitransh-singh-rathaur" },
    ],
  }),
  component: function ChitranshPage() {
    return (
      <FounderProfilePage
        founder={{
          slug: "chitransh-singh-rathaur",
          name: "Chitransh Singh Rathour",
          role: "CFO & COO",
          image: founderChitransh,
          description:
            "CFO & COO of Renoide. Specialist in operations management, financial strategy, process optimization, and organizational scaling.",
          intro:
            "Chitransh drives Renoide\u2019s operational excellence and business execution. With a strong focus on financial planning, optimization, and strategic scaling, he manages the business side of innovation while ensuring operational efficiency and sustainable growth.",
          skills: ["Operations Management", "Financial Strategy", "Process Optimization", "Business Development", "Organizational Scaling"],
          linkedin: "https://www.linkedin.com/in/chitransh-singh-rathour-279b94352/",
          instagram: "https://www.instagram.com/thakur.chitransh.singh/?hl=en",
          github: "https://github.com/ChitranshSingh",
          keywords: "Chitransh Singh Rathaur Renoide, CFO COO Renoide, operations management, financial strategy, organizational scaling",
        }}
      />
    );
  },
});
