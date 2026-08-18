import { PagePlaceholder } from "@/components/page-placeholder";
export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <PagePlaceholder title="Review" description={`Placeholder para la review “${slug}”.`} />; }
