import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectDetails, getProjectDetailBySlug } from "@/data/projectDetails";
import { ProjectDetailContent } from "./ProjectDetailContent";

export function generateStaticParams() {
  return projectDetails.map((item) => ({ slug: item.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getProjectDetailBySlug(slug);
  if (!item) return {};

  const path = `/projects/${slug}/`;
  return {
    title: item.title,
    description: item.shortDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${item.title} | Ron Gurfinkel`,
      description: item.shortDescription,
      url: path,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${item.title} | Ron Gurfinkel`,
      description: item.shortDescription,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getProjectDetailBySlug(slug);
  if (!item) notFound();

  return <ProjectDetailContent item={item} />;
}
