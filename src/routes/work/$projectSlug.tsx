import { createFileRoute, notFound } from "@tanstack/react-router";
import ProjectProfilePage from "@/components/ProjectProfilePage";
import { PROJECTS } from "@/components/Landing";

export const Route = createFileRoute("/work/$projectSlug")({
  loader: async ({ params: { projectSlug } }) => {
    const project = PROJECTS.find((p) => p.slug === projectSlug);
    if (!project) {
      throw notFound();
    }
    return { project };
  },
  head: ({ loaderData }) => {
    const project = loaderData?.project;
    if (!project) return {};
    return {
      meta: [
        { title: `${project.title} Case Study — ${project.tag} | Renoide` },
        {
          name: "description",
          content: `${project.description.slice(0, 150)}...`,
        },
        { name: "keywords", content: `${project.title}, ${project.category}, ${project.tag}, ${project.technologies.join(", ")}, Renoide` },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: `${project.title} Case Study — ${project.tag} | Renoide` },
        {
          property: "og:description",
          content: project.tagline,
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `https://renoide.in/work/${project.slug}` },
        { property: "og:image", content: "https://renoide.in/og-image.png" },
        { property: "og:site_name", content: "Renoide" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${project.title} Case Study — ${project.tag} | Renoide` },
        { name: "twitter:description", content: project.tagline },
        { name: "twitter:image", content: "https://renoide.in/og-image.png" },
      ],
      links: [
        { rel: "canonical", href: `https://renoide.in/work/${project.slug}` },
      ],
    };
  },
  component: function ProjectRouteComponent() {
    const { project } = Route.useLoaderData();
    return <ProjectProfilePage project={project} />;
  },
});
