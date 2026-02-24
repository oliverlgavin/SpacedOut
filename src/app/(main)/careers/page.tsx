import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/fade-in";
import { CAREER_CATEGORIES } from "@/lib/constants/careers";
import { CareerSection } from "@/components/sections/careers/career-section";

export const metadata: Metadata = {
  title: "Careers in Space",
  description:
    "Explore career opportunities in space exploration, astronomy, astrophysics, and aerospace engineering. Links to NASA, ESA, SpaceX, and more.",
};

export default function CareersPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FadeIn>
        <div className="mb-10">
          <p className="text-xs font-mono text-blue-electric tracking-[0.25em] uppercase mb-2">
            Your Future in Space
          </p>
          <h1 className="text-3xl font-bold">Careers in Space</h1>
          <p className="text-sm text-foreground-muted mt-2 max-w-2xl">
            Whether you&apos;re a student, graduate, or experienced professional — explore
            opportunities across space agencies, research institutions, and the
            commercial space industry.
          </p>
        </div>
      </FadeIn>

      <div className="space-y-12">
        {CAREER_CATEGORIES.map((category, i) => (
          <FadeIn key={category.name} delay={i * 0.1}>
            <CareerSection category={category} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
