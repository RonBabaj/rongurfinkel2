import { notFound } from "next/navigation";
import { playgroundItems, getPlaygroundItemBySlug } from "@/data/playground";
import { PlaygroundSlugContent } from "./PlaygroundSlugContent";

export function generateStaticParams() {
  return playgroundItems.map((item) => ({ slug: item.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PlaygroundSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getPlaygroundItemBySlug(slug);
  if (!item) notFound();

  return <PlaygroundSlugContent item={item} />;
}
