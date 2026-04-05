import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { playgroundItems, getPlaygroundItemBySlug } from "@/data/playground";
import { PlaygroundSlugContent } from "./PlaygroundSlugContent";

export function generateStaticParams() {
  return playgroundItems.map((item) => ({ slug: item.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getPlaygroundItemBySlug(slug);
  if (!item) return {};

  const path = `/playground/${slug}`;
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

export default async function PlaygroundSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getPlaygroundItemBySlug(slug);
  if (!item) notFound();

  return <PlaygroundSlugContent item={item} />;
}
