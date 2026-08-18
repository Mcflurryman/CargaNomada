import { PagePlaceholder } from "@/components/page-placeholder";
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <PagePlaceholder title="Guía" description={`Placeholder para la guía “${slug}”.`} />; }
