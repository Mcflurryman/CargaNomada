import { PagePlaceholder } from "@/components/page-placeholder";
export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <PagePlaceholder title="Comparativa" description={`Placeholder para la comparativa “${slug}”.`} />; }
