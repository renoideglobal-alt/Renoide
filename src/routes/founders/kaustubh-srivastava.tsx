import { createFileRoute } from "@tanstack/react-router";
import FounderProfilePage from "@/components/FounderProfilePage";
import founderKaustubh from "@/assets/founder-kaustubh.jpg";

export const Route = createFileRoute("/founders/kaustubh-srivastava")({
  head: () => ({
    meta: [
      { title: "Kaustubh Srivastava — CPO & CMO at Renoide | Product Design & Marketing Strategy" },
      {
        name: "description",
        content:
          "Kaustubh Srivastava is the CPO & CMO of Renoide, an AI-first technology agency in India. Expert in product design, UX, marketing strategy, brand development and customer engagement.",
      },
      { name: "keywords", content: "Kaustubh Srivastava, Renoide CPO, Renoide CMO, product strategist, product design, marketing strategy, user experience, brand development, Renoide founder, customer engagement" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Kaustubh Srivastava — CPO & CMO at Renoide" },
      {
        property: "og:description",
        content:
          "CPO & CMO of Renoide. Product visionary specializing in UX, brand development, marketing strategy, and digital experience design.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://renoide.in/founders/kaustubh-srivastava" },
      { property: "og:image", content: "https://renoide.in/og-image.png" },
      { property: "og:site_name", content: "Renoide" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kaustubh Srivastava — CPO & CMO at Renoide" },
      { name: "twitter:description", content: "Product designer, marketing strategist, and co-founder of Renoide." },
    ],
    links: [
      { rel: "canonical", href: "https://renoide.in/founders/kaustubh-srivastava" },
    ],
  }),
  component: function KaustubhPage() {
    return (
      <FounderProfilePage
        founder={{
          slug: "kaustubh-srivastava",
          name: "Kaustubh Srivastava",
          role: "CPO & CMO",
          image: founderKaustubh,
          description:
            "CPO & CMO of Renoide. Expert in product design, marketing strategy, user experience, brand development, and customer engagement.",
          intro:
            "Kaustubh leads product vision, user experience, and brand positioning at Renoide. His strength lies in bridging product design with customer psychology, creating engaging digital experiences and strong market identities that resonate with modern businesses.",
          skills: ["Product Design", "Marketing Strategy", "User Experience", "Brand Development", "Customer Engagement"],
          linkedin: "https://www.linkedin.com/in/kaustubh-srivastava-587a68400/",
          instagram: "https://www.instagram.com/the_aeacus/?hl=en",
          github: "https://github.com/Kaustubhsrivastava35",
          keywords: "Kaustubh Srivastava Renoide, CPO CMO Renoide, product strategist, product design, marketing strategy",
        }}
      />
    );
  },
});
