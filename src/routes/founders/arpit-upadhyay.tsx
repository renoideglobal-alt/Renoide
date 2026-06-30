import { createFileRoute } from "@tanstack/react-router";
import FounderProfilePage from "@/components/FounderProfilePage";
import founderArpit from "@/assets/founder-arpit.jpg";

export const Route = createFileRoute("/founders/arpit-upadhyay")({
  head: () => ({
    meta: [
      { title: "Arpit Upadhyay — CEO & CTO at Renoide | AI Systems & Software Architecture" },
      {
        name: "description",
        content:
          "Arpit Upadhyay is the CEO & CTO of Renoide, an AI-first technology agency based in India. Expert in AI systems, software architecture, intelligent automation, and scalable product strategy.",
      },
      { name: "keywords", content: "Arpit Upadhyay, Arpit Upadhayay, Renoide CEO, Renoide CTO, AI founder India, software architect, AI systems expert, automation infrastructure, Renoide founder" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Arpit Upadhyay — CEO & CTO at Renoide" },
      {
        property: "og:description",
        content:
          "Technical architect and AI founder. CEO & CTO of Renoide — a modern technology agency building AI systems, web apps and automation solutions.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://renoide.com/founders/arpit-upadhyay" },
      { property: "og:image", content: "https://renoide.com/og-image.png" },
      { property: "og:site_name", content: "Renoide" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Arpit Upadhyay — CEO & CTO at Renoide" },
      { name: "twitter:description", content: "AI systems expert, software architect, and co-founder of Renoide." },
    ],
    links: [
      { rel: "canonical", href: "https://renoide.com/founders/arpit-upadhyay" },
    ],
  }),
  component: function ArpitPage() {
    return (
      <FounderProfilePage
        founder={{
          slug: "arpit-upadhyay",
          name: "Arpit Upadhyay",
          role: "CEO & CTO",
          image: founderArpit,
          description:
            "Technical architect and CEO/CTO of Renoide. Expert in AI systems, software architecture, intelligent automation, and scalable product strategy.",
          intro:
            "Arpit is the technical architect behind Renoide\u2019s engineering backbone. Focused on scalable AI systems, software architecture, and intelligent automation, he leads the company\u2019s core innovation and product strategy. His expertise lies in building high-performance digital ecosystems and transforming complex business workflows into automated solutions.",
          skills: ["AI Systems", "Software Architecture", "Product Strategy", "Automation Infrastructure", "Business Leadership"],
          linkedin: "https://www.linkedin.com/in/arpit-upadhayay-281407381/",
          instagram: "https://www.instagram.com/arpit_upadhyay_77/?hl=en",
          github: "https://github.com/MrAusil",
          keywords: "Arpit Upadhyay Renoide, CEO CTO Renoide, AI founder India, software architect, automation expert",
        }}
      />
    );
  },
});
