import { redirect } from 'next/navigation';

interface LegacyServiceSlugProps {
  params: { slug: string };
}

export default function LegacyServiceSlugRedirect({ params }: LegacyServiceSlugProps) {
  redirect(`/contracting-services/${params.slug}`);
}
