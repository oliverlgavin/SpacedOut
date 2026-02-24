import { notFound } from "next/navigation";
import { AGENCIES } from "@/lib/constants/agencies";
import { AgencyDetail } from "@/components/sections/agencies/agency-detail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return AGENCIES.map((agency) => ({ slug: agency.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const agency = AGENCIES.find((a) => a.slug === slug);
  if (!agency) return {};
  return {
    title: `${agency.abbrev} — ${agency.name}`,
    description: agency.description,
  };
}

export default async function AgencyPage({ params }: Props) {
  const { slug } = await params;
  const agency = AGENCIES.find((a) => a.slug === slug);

  if (!agency) notFound();

  return <AgencyDetail agency={agency} />;
}
